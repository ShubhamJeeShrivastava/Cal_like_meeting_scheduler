'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Calendar, LinkIcon, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PUBLIC_USER_ID = "admin"

export default function PrivateNavBar() {
    const pathname = usePathname();
    const [copied, setCopied] = useState(false)

    // If it's a public booking route (starts with /book but NOT /bookings), don't show the sidebar
    if (pathname.startsWith('/book') && !pathname.startsWith('/bookings')) return null;

    const publicUrl = typeof window !== "undefined"
        ? `${window.location.origin}/book/${PUBLIC_USER_ID}`
        : `/book/${PUBLIC_USER_ID}`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/book/${PUBLIC_USER_ID}`
            )
            setCopied(true)
            toast("Public page link copied!", {
                className: "!text-green-400 !font-medium",
                duration: 3000,
            })
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast("Failed to copy link")
        }
    }

    return (
        <aside className="w-[240px] flex-shrink-0 bg-[#0f0f10] text-[#939393] border-r border-[#262626] sticky top-0 h-screen flex flex-col">
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              {/* Logo & Branding */}
              <div className="flex items-center gap-2.5 px-2 mb-8 mt-2 p-2">
                  {/* Cal.com-style logo mark */}
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="17" rx="3" fill="#111"/>
                          <rect x="3" y="4" width="18" height="7" rx="2" fill="#111"/>
                          <path d="M8 2v4M16 2v4" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                          <rect x="7" y="13" width="3" height="3" rx="0.5" fill="white"/>
                          <rect x="10.5" y="13" width="3" height="3" rx="0.5" fill="white"/>
                          <rect x="14" y="13" width="3" height="3" rx="0.5" fill="white"/>
                      </svg>
                  </div>
                  <div className="flex flex-col leading-tight">
                      <span className="text-white font-bold text-sm tracking-tight">Cal</span>
                      <span className="text-[#555] text-[10px] tracking-wide">by Shubham</span>
                  </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#1e1e1e] mb-4" />

              {/* Nav Links */}
              <div className="flex flex-col space-y-1">
                {/* Event Types */}
                <Link href="/events" className={cn("flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626]", pathname.startsWith('/events') && "bg-[#262626] text-white")}>
                    <LinkIcon size={16} />
                    Event types
                </Link>
                {/* Bookings */}
                <Link href="/bookings" className={cn("flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626]", pathname.startsWith('/bookings') && "bg-[#262626] text-white")}>
                    <Calendar size={16} />
                    Bookings
                </Link>
                {/* Availability */}
                <Link href="/schedule" className={cn("flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626]", pathname.startsWith('/schedule') && "bg-[#262626] text-white")}>
                    <Clock size={16} />
                    Availability
                </Link>
              </div>
            </div>

            {/* Footer links */}
            <div className="flex flex-col space-y-1 py-4 px-4 border-t border-[#1e1e1e] bg-[#0f0f10]">
                <Link
                    href={`/book/${PUBLIC_USER_ID}`}
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626]"
                >
                    <ExternalLink size={16} /> View public page
                </Link>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] text-left w-full"
                >
                    {copied
                        ? <><Check size={16} className="text-green-400" /> <span className="text-green-400">Copied!</span></>
                        : <><Copy size={16} /> Copy public page link</>
                    }
                </button>
            </div>
        </aside>
    )
}