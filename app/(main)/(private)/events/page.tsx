import EventCard from "@/components/cards/EventCard";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/server/actions/events";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
    const userId = "admin";
    const events = await getEvents(userId)

    return (
        <section className="min-h-screen bg-[#0f0f10] text-[#ededed] p-10 font-sans">
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Event types</h1>
                        <p className="text-sm text-[#939393] mt-1">Configure different events for people to book on your calendar.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="border border-[#262626] rounded-md px-3 py-1.5 flex items-center bg-[#0f0f10] text-sm text-[#939393]">
                            <span className="mr-2 opacity-50">🔍</span> Search
                        </div>
                        <Button 
                            className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer"
                            asChild>
                            <Link href="/events/new">
                                <Plus className="mr-1 h-4 w-4" /> New
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Event Cards or Empty State */}
                {events.length > 0 ? (
                    <div className="border border-[#262626] rounded-xl overflow-hidden bg-[#161616]">
                        {events.map((event, index) => (
                            <div key={event.id} className={`${index !== events.length - 1 ? 'border-b border-[#262626]' : ''}`}>
                                <EventCard {...event} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border border-[#262626] rounded-xl p-10 flex flex-col items-center justify-center text-center bg-[#161616]">
                        <div className="bg-[#262626] p-3 rounded-full mb-4">
                            <Plus className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No event types</h3>
                        <p className="text-sm text-[#939393] mb-6 max-w-sm">
                            You haven't created any event types yet. Create your first event type to start receiving bookings.
                        </p>
                        <Button 
                            className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer"
                            asChild>
                            <Link href="/events/new">
                                Create event type
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}