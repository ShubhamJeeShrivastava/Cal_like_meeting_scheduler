import { getEvent } from "@/server/actions/events";
import { AlertTriangle, Calendar } from "lucide-react";
import {
  addYears,
  eachMinuteOfInterval,
  endOfDay,
  roundToNearestMinutes,
} from "date-fns"
import { getValidTimesFromSchedule } from "@/server/actions/schedule";
import NoTimeSlots from "@/components/NoTimeSlots";
import MeetingForm from "@/components/forms/MeetingForm";
import Link from "next/link";

export default async function BookingPage({
    params
  }: {
    params: Promise<{ clerkUserId: string; eventId: string }>
  }) {

    const { clerkUserId, eventId } = await params

    const event = await getEvent(clerkUserId, eventId)
    if(!event)  return (
      <div className="bg-[#0f0f10] min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3 text-sm max-w-md w-full">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>This event doesn't exist anymore.</span>
        </div>
      </div>
    )

      const calendarUser = { fullName: "Shubham", id: clerkUserId }

    const startDate = roundToNearestMinutes(new Date(), {
      nearestTo: 15,
      roundingMethod: "ceil",
    })
    
    const endDate = endOfDay(addYears(startDate, 1))

  const validTimes = await getValidTimesFromSchedule(
    eachMinuteOfInterval({ start: startDate, end: endDate }, { step: 15 }),
    event
  )

   if (validTimes.length === 0) {
    return <NoTimeSlots event={event} calendarUser={calendarUser} />
  }

  return (
    <section className="min-h-screen bg-[#0f0f10] text-[#ededed] py-12 px-4 font-sans flex flex-col items-center">
        {/* Branding Logo */}
        <Link href={`/book/${clerkUserId}`} className="flex items-center gap-2 mb-10 group">
          <div className="bg-white p-1 rounded-md">
            <Calendar className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-white tracking-tight text-lg">
              Cal <span className="text-[#939393] font-normal text-sm">by Shubham</span>
          </span>
        </Link>

        <div className="border border-[#262626] rounded-2xl bg-[#161616] p-8 md:p-10 text-white w-full max-w-2xl shadow-2xl">
            <div className="mb-8 border-b border-[#262626] pb-6">
                <h1 className="text-2xl font-bold tracking-tight mb-2">
                    {event.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-[#939393]">
                    <span>with {calendarUser.fullName}</span>
                    <span>•</span>
                    <span className="bg-[#262626] px-2 py-0.5 rounded text-xs font-medium">{event.durationInMinutes} min</span>
                </div>
                {event.description && (
                    <p className="text-[#888] mt-4 text-sm leading-relaxed">{event.description}</p>
                )}
            </div>
            
            <MeetingForm
                validTimes={validTimes}
                eventId={event.id}
                clerkUserId={clerkUserId}
            />
        </div>
    </section>
  )   
}