'use client'

import { PrivateNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Calendar, LinkIcon, Users, Grid, Repeat, Activity, Settings, ExternalLink, Copy, Gift } from "lucide-react";

export default function PrivateNavBar() {
    const pathname = usePathname();

    // If it's a public booking route, don't show the sidebar
    if (pathname.startsWith('/book')) return null;

    return (
        <aside className="w-[240px] flex-shrink-0 bg-[#0f0f10] h-screen text-[#939393] flex flex-col justify-between py-6 px-4 border-r border-[#262626] selection:bg-[#fff] selection:text-black">
            <div>
              {/* Logo & User profile mock */}
              <div className="flex items-center gap-3 px-2 mb-8 mt-2 cursor-pointer text-white hover:bg-[#262626] p-2 rounded-md transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      A
                  </div>
                  <span className="font-medium text-sm">Admin User</span>
              </div>

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
                
                {/* Fake links for visual imitation */}
                <div className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer">
                    <div className="flex items-center gap-3"><Users size={16} /> Teams</div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer">
                    <div className="flex items-center gap-3"><Grid size={16} /> Apps</div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer">
                    <div className="flex items-center gap-3"><Repeat size={16} /> Workflows</div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer">
                    <div className="flex items-center gap-3"><Activity size={16} /> Insights</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer">
                    <ExternalLink size={16} /> View public page
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer">
                    <Copy size={16} /> Copy public page link
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer">
                    <Gift size={16} /> Refer and earn
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-white hover:bg-[#262626] cursor-pointer mt-2">
                    <Settings size={16} /> Settings
                </div>
            </div>
        </aside>
    )
}