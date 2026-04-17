'use client'

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import EventCard from "./cards/EventCard"

type Event = {
  id: string
  name: string
  description: string | null
  durationInMinutes: number
  clerkUserId: string
  isActive: boolean
}

export default function EventsClient({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("")

  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    (e.description ?? "").toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="min-h-screen bg-[#0f0f10] text-[#ededed] p-4 sm:p-6 md:p-10 font-sans">
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Event types</h1>
            <p className="text-sm text-[#939393] mt-1">Configure different events for people to book on your calendar.</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            {/* Live Search Input */}
            <div className="flex items-center bg-[#161616] border border-[#262626] rounded-md px-3 py-2 gap-2 focus-within:border-[#555] transition-colors w-full sm:w-auto">
              <Search className="w-4 h-4 text-[#939393] shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="bg-transparent text-sm text-white placeholder:text-[#555] outline-none w-full sm:w-48 sm:focus:w-56 transition-[width] duration-200"
              />
            </div>
            <Button
              className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer w-full sm:w-auto"
              asChild>
              <Link href="/events/new">
                <Plus className="mr-1 h-4 w-4" /> New
              </Link>
            </Button>
          </div>
        </div>

        {/* Results */}
        {events.length === 0 ? (
          /* No events at all */
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
              <Link href="/events/new">Create event type</Link>
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          /* No search results */
          <div className="border border-[#262626] rounded-xl p-10 flex flex-col items-center justify-center text-center bg-[#161616]">
            <div className="bg-[#262626] p-3 rounded-full mb-4">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No results for "{query}"</h3>
            <p className="text-sm text-[#939393]">Try a different search term.</p>
          </div>
        ) : (
          /* Event list */
          <div className="border border-[#262626] rounded-xl overflow-hidden bg-[#161616]">
            {filtered.map((event, index) => (
              <div key={event.id} className={index !== filtered.length - 1 ? "border-b border-[#262626]" : ""}>
                <EventCard {...event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
