'use server'

import { db } from "@/drizzle/db";
import { MeetingTable } from "@/drizzle/schema";
import { meetingActionSchema } from "@/schema/meetings";
import { fromZonedTime } from "date-fns-tz";
import { getValidTimesFromSchedule } from "./schedule";
import { createCalendarEvent } from "../google/googleCalendar";
import { z } from "zod";
import { addMinutes } from "date-fns";
import { eq, and } from "drizzle-orm";

// Server action to create a meeting and save it to the database
export async function createMeeting(
  unsafeData: z.infer<typeof meetingActionSchema>
) {
  try {
    const { success, data } = meetingActionSchema.safeParse(unsafeData);
    if (!success) throw new Error("Invalid data.");

    // Find the event in the database
    const event = await db.query.EventTable.findFirst({
      where: ({ clerkUserId, isActive, id }, { eq, and }) =>
        and(
          eq(isActive, true),
          eq(clerkUserId, data.clerkUserId),
          eq(id, data.eventId)
        ),
    });

    if (!event) throw new Error("Event not found.");

    const startInTimezone = fromZonedTime(data.startTime, data.timezone);

    const validTimes = await getValidTimesFromSchedule([startInTimezone], event);
    if (validTimes.length === 0) throw new Error("Selected time is not valid.");

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

    return { clerkUserId: data.clerkUserId, eventId: data.eventId, startTime: data.startTime };
  } catch (error: any) {
    console.error(`Error creating meeting: ${error.message || error}`);
    throw new Error(`Failed to create meeting: ${error.message || error}`);
  }
}

// Server action to fetch all bookings for the admin user
export async function getBookings() {
  const userId = "admin";
  return db.query.MeetingTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ startTime }, { desc }) => [desc(startTime)],
  });
}

// Server action to delete a booking
export async function cancelMeeting(id: string) {
  try {
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