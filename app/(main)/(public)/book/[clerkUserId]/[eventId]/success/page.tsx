// This code defines a **Next.js server component** that displays a success page after a user books an event. It takes in URL parameters (`clerkUserId` and `eventId`) and a query parameter (`startTime`), then queries the database for a matching active event. If no event is found, it shows a 404 page. Otherwise, it fetches the user's details from Clerk, formats the provided `startTime` into a readable format, and displays a confirmation message indicating the event name, the user's full name, and the scheduled time. It also informs the user that an email confirmation will be sent, signaling that the booking was successful.

import { formatDateTime } from "@/lib/formatters";
import { getEvent } from "@/server/actions/events";
import { AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";

export default async function SuccessPage({
    params,
    searchParams,
}: {
    params: Promise<{ clerkUserId: string; eventId: string }>
    searchParams: Promise<{ startTime: string }>
}) {
    const { clerkUserId, eventId } = await params
    const { startTime } = await searchParams
    
    const event = await getEvent(clerkUserId, eventId)
    
    if(!event) return (
        <div className="bg-[#0f0f10] min-h-screen flex items-center justify-center p-4">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3 text-sm max-w-md w-full">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>This event doesn't exist anymore.</span>
            </div>
        </div>
    )

    const calendarUser = { fullName: "Shubham", id: clerkUserId }
    const startTimeDate = new Date(startTime)

    return (
        <section className="min-h-screen bg-[#0f0f10] text-[#ededed] py-12 px-4 font-sans flex flex-col items-center justify-center">
            <div className="bg-[#161616] border border-[#262626] rounded-3xl p-10 md:p-12 text-center max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-8">
                    <div className="bg-green-500/10 p-4 rounded-full">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-2">You're all set!</h1>
                <p className="text-[#939393] mb-8">
                    A confirmation email has been sent for your session with <span className="text-white font-medium">{calendarUser.fullName}</span>.
                </p>

                <div className="bg-[#0f0f10] border border-[#262626] rounded-2xl p-6 mb-10 text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-1 rounded-md">
                            <Calendar className="w-4 h-4 text-black" strokeWidth={2.5} />
                        </div>
                        <span className="font-semibold text-white">{event.name}</span>
                    </div>
                    <p className="text-sm text-[#939393]">
                        {formatDateTime(startTimeDate)}
                    </p>
                </div>

                <Link 
                    href="/"
                    className="inline-block bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                    Done
                </Link>
            </div>

            <p className="mt-12 text-[#666] text-xs">
                Powered by Cal by Shubham
            </p>
        </section>
    )
}