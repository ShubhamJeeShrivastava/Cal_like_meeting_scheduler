'use client'

import { useEffect, useState } from "react"
import PrivateNavBar from "@/components/PrivateNavBar"

export default function MainShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    // Prevent background scroll when drawer is open
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <main className="relative flex min-h-screen bg-[#0f0f10]">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <PrivateNavBar className="sticky top-0" />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-[#0f0f10]/95 backdrop-blur border-b border-[#262626]">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-[#939393] hover:text-white hover:bg-[#262626] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="text-sm font-semibold text-white tracking-tight">Cal</div>
          <div className="w-10" />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] shadow-2xl">
            <PrivateNavBar
              showCloseButton
              onClose={() => setMobileOpen(false)}
              className="sticky top-0"
            />
          </div>
        </div>
      )}

      <section className="flex-1 overflow-y-auto pt-14 md:pt-0">
        {children}
      </section>
    </main>
  )
}

