import { getBookings, type BookingRow } from "@/server/actions/meetings";
import { CalendarRange, Clock, User, Mail } from "lucide-react";
import { format, isFuture, isPast } from "date-fns";
import { DeleteBookingButton } from "@/components/DeleteBookingButton";

export default async function BookingsPage() {
    const bookings: BookingRow[] = await getBookings();

    const upcoming = bookings.filter((b: BookingRow) => isFuture(b.startTime));
    const past = bookings.filter((b: BookingRow) => isPast(b.startTime));

    return (
        <section className="min-h-screen bg-[#0f0f10] text-[#ededed] p-10 font-sans">
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Bookings</h1>
                    <p className="text-sm text-[#939393] mt-1">See upcoming and past events booked through your calendar.</p>
                </div>

                {bookings.length === 0 ? (
                    /* Empty State */
                    <div className="border border-[#262626] rounded-xl p-16 flex flex-col items-center justify-center text-center bg-[#161616]">
                        <div className="bg-[#262626] p-4 rounded-full mb-5">
                            <CalendarRange className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No bookings yet</h3>
                        <p className="text-sm text-[#939393] max-w-sm">
                            Share your event links and bookings will appear here once guests schedule time with you.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-10">
                        {/* Upcoming */}
                        {upcoming.length > 0 && (
                            <div>
                                <h2 className="text-xs font-semibold text-[#939393] uppercase tracking-widest mb-3">Upcoming</h2>
                                <div className="border border-[#262626] rounded-xl bg-[#161616] overflow-hidden divide-y divide-[#262626]">
                                    {upcoming.map(booking => (
                                        <BookingRow key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Past */}
                        {past.length > 0 && (
                            <div>
                                <h2 className="text-xs font-semibold text-[#939393] uppercase tracking-widest mb-3">Past</h2>
                                <div className="border border-[#262626] rounded-xl bg-[#161616] overflow-hidden divide-y divide-[#262626] opacity-70">
                                    {past.map(booking => (
                                        <BookingRow key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

function BookingRow({ booking }: { booking: {
    id: string
    eventName: string
    guestName: string
    guestEmail: string
    guestNotes: string | null
    startTime: Date
    durationInMinutes: number
    timezone: string
}}) {
    return (
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1a1a1a] transition-colors relative group">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-base">{booking.eventName}</span>
                    <span className="text-xs bg-[#262626] text-[#939393] px-2 py-0.5 rounded-full">
                        {booking.durationInMinutes} min
                    </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#939393]">
                    <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> {booking.guestName}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> {booking.guestEmail}
                    </span>
                </div>
                {booking.guestNotes && (
                    <p className="text-xs text-[#666] italic mt-1">"{booking.guestNotes}"</p>
                )}
            </div>
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-[#939393] shrink-0">
                    <div className="flex items-center gap-1.5 text-white font-medium">
                        <CalendarRange className="w-4 h-4 text-[#939393]" />
                        {format(booking.startTime, "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {format(booking.startTime, "h:mm a")} · {booking.timezone}
                    </div>
                </div>

                {/* Cancel Button */}
                <DeleteBookingButton id={booking.id} />
            </div>
        </div>
    )
}
