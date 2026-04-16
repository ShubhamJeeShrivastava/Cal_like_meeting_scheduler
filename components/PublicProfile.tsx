import { getPublicEvents } from "@/server/actions/events"
import { Clock } from "lucide-react"
import Link from "next/link"

type PublicProfileProps = {
  userId: string
  fullName: string | null
}

export default async function PublicProfile({ userId, fullName }: PublicProfileProps) {
  const events = await getPublicEvents(userId)

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      {/* Top profile hero */}
      <div className="border-b border-[#1e1e1e] py-14 px-4">
        <div className="max-w-lg mx-auto flex flex-col items-center text-center">
          {/* Cal.com-style logo mark */}
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-xl ring-1 ring-white/10">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="17" rx="3" fill="#111"/>
              <rect x="3" y="4" width="18" height="7" rx="2" fill="#111"/>
              <path d="M8 2v4M16 2v4" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
              <rect x="7" y="13" width="3" height="3" rx="0.5" fill="white"/>
              <rect x="10.5" y="13" width="3" height="3" rx="0.5" fill="white"/>
              <rect x="14" y="13" width="3" height="3" rx="0.5" fill="white"/>
            </svg>
          </div>
          {/* Name */}
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">{fullName}</h1>
          <p className="text-[#555] text-xs tracking-widest uppercase font-medium mb-3">Cal by Shubham</p>
          {/* Tagline */}
          <p className="text-[#939393] text-sm max-w-xs">
            Welcome! Pick an event below to book a time with me.
          </p>
        </div>
      </div>

      {/* Event list */}
      <div className="max-w-lg mx-auto py-10 px-4 flex flex-col gap-4">
        {events.length === 0 ? (
          <div className="text-center text-[#555] py-20">
            <p className="text-lg font-medium text-white mb-1">No events available</p>
            <p className="text-sm">Check back later.</p>
          </div>
        ) : (
          events.map(event => (
            <Link
              key={event.id}
              href={`/book/${userId}/${event.id}`}
              className="group block border border-[#262626] hover:border-[#444] rounded-xl bg-[#161616] hover:bg-[#1a1a1a] p-5 transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-white text-base tracking-tight group-hover:text-white mb-2">
                    {event.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[#939393] text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{event.durationInMinutes} min</span>
                  </div>
                  {event.description && (
                    <p className="text-[#666] text-sm mt-2 line-clamp-2">{event.description}</p>
                  )}
                </div>
                {/* Arrow */}
                <div className="text-[#555] group-hover:text-white transition-colors mt-1 ml-4 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-[#333] text-xs">
        Powered by <span className="text-[#555]">Cal by Shubham</span>
      </div>
    </div>
  )
}