'use server'

import { getDb } from "@/drizzle/db";
import { MeetingTable } from "@/drizzle/schema";
import { meetingActionSchema } from "@/schema/meetings";
import { fromZonedTime } from "date-fns-tz";
import { getValidTimesFromSchedule } from "./schedule";
import { createCalendarEvent } from "../google/googleCalendar";
import { z } from "zod";
import { addMinutes } from "date-fns";
import { eq, and } from "drizzle-orm";

type CreateMeetingResult =
  | {
      ok: true
      data: { clerkUserId: string; eventId: string; startTime: Date }
    }
  | { ok: false; error: string }

export type BookingRow = typeof MeetingTable.$inferSelect

// Server action to create a meeting and save it to the database
export async function createMeeting(
  unsafeData: z.infer<typeof meetingActionSchema>
) : Promise<CreateMeetingResult> {
  try {
    const db = getDb()
    const { success, data } = meetingActionSchema.safeParse(unsafeData);
    if (!success) return { ok: false, error: "Invalid booking data." }

    // Find the event in the database
    const event = await db.query.EventTable.findFirst({
      where: ({ clerkUserId, isActive, id }, { eq, and }) =>
        and(
          eq(isActive, true),
          eq(clerkUserId, data.clerkUserId),
          eq(id, data.eventId)
        ),
    });

    if (!event) return { ok: false, error: "Event not found." }

    const startInTimezone = fromZonedTime(data.startTime, data.timezone);

    const validTimes = await getValidTimesFromSchedule([startInTimezone], event);
    if (validTimes.length === 0) return { ok: false, error: "Selected time is not available." }

    // Save the meeting to the database
    await db.insert(MeetingTable).values({
      eventId: event.id,
      clerkUserId: data.clerkUserId,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestNotes: data.guestNotes ?? null,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      timezone: data.timezone,
      eventName: event.name,
    });

    // Also try to create a Google Calendar event (stubbed out, won't fail)
    await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
    });

    return { ok: true, data: { clerkUserId: data.clerkUserId, eventId: data.eventId, startTime: data.startTime } }
  } catch (error: any) {
    const message =
      typeof error?.message === "string" && error.message.length > 0
        ? error.message
        : "Failed to save booking."
    console.error(`Error creating meeting: ${message}`)
    return { ok: false, error: message }
  }
}

// Server action to fetch all bookings for the admin user
export async function getBookings() {
  const db = getDb()
  const userId = "admin";
  return db.query.MeetingTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ startTime }, { desc }) => [desc(startTime)],
  });
}

// Server action to delete a booking
export async function cancelMeeting(id: string) {
  try {
    const db = getDb()
    const userId = "admin";
    
    const result = await db
      .delete(MeetingTable)
      .where(
        and(
          eq(MeetingTable.id, id),
          eq(MeetingTable.clerkUserId, userId)
        )
      );

    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting meeting: ${error.message || error}`);
    throw new Error(`Failed to delete meeting: ${error.message || error}`);
  }
}