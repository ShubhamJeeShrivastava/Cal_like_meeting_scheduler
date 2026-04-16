'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight, Clock } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col leading-none">
                        <div className="font-black text-2xl tracking-tighter">Cal</div>
                        <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">By Shubham</div>
                    </div>
                </div>
                <Link href="/events" className="bg-[#111111] hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg">
                    Go to app <ChevronRight size={16} />
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-8 pt-12 flex flex-col lg:flex-row gap-16 items-center">
                
                {/* Left side texts */}
                <div className="flex-1 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f6f6f6] border border-gray-200 rounded-full text-sm font-medium mb-6">
                        Built by Shubham Jee Shrivastava
                    </div>
                    
                    <h1 className="text-[64px] lg:text-[76px] font-black leading-[1.02] tracking-tighter mb-6 text-[#111111]">
                        The better way to schedule your meetings
                    </h1>
                    
                    <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-[420px] font-medium">
                        A fully customizable scheduling software for individuals and businesses. Streamline your availability and bookings instantly.
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        <Link href="/events" className="flex items-center justify-center gap-2 w-fit bg-[#111111] hover:bg-black text-white py-4 px-8 rounded-full font-bold text-lg transition-all hover:shadow-2xl active:scale-[0.98]">
                            Start Scheduling Now <ArrowRight size={20} />
                        </Link>
                        <p className="text-sm text-gray-400 ml-2 font-medium">Project by Shubham Jee Shrivastava</p>
                    </div>
                </div>

                {/* Right side mock UI (Simplified for branding) */}
                <div className="flex-1 lg:max-w-[800px] w-full border border-gray-200 rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] bg-white overflow-hidden flex flex-col sm:flex-row transform transition hover:translate-y-[-4px] duration-500">
                    <div className="sm:w-1/2 p-10 border-r border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center mb-6 shadow-xl">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="17" rx="3" fill="white"/>
                                    <rect x="3" y="4" width="18" height="7" rx="2" fill="white"/>
                                    <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#111"/>
                                    <rect x="10.5" y="13" width="3" height="3" rx="0.5" fill="#111"/>
                                    <rect x="14" y="13" width="3" height="3" rx="0.5" fill="#111"/>
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Shubham Jee Shrivastava</h3>
                            <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">Product Strategy Session</h2>
                            <p className="text-gray-500 text-base mb-8 leading-relaxed">
                                Let's discuss the project roadmap and implementation details for the upcoming release.
                            </p>
                        </div>
                        
                        <div className="space-y-5 text-sm text-gray-600 font-bold">
                            <div className="flex items-center gap-4">
                                <Clock size={20} className="text-gray-900"/>
                                <span className="bg-gray-100 px-3 py-1.5 rounded-md">45 minutes</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-black p-1 rounded w-5 h-5 flex items-center justify-center text-white text-[10px] font-black">
                                    C
                                </div>
                                Cal Link
                            </div>
                        </div>
                    </div>

                    <div className="sm:w-1/2 p-10 bg-[#fafafa]">
                        <div className="flex justify-between items-center mb-8">
                            <span className="font-black text-xl">June <span className="text-gray-300">2026</span></span>
                            <div className="flex gap-3">
                                <ChevronRight size={20} className="text-gray-300 rotate-180" />
                                <ChevronRight size={20} className="text-gray-900" />
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-gray-400 font-black mb-4 tracking-widest">
                            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-base font-bold">
                            {/* Dummy Calendar Days */}
                            <div className="py-2 text-gray-200">1</div><div className="py-2 text-gray-200">2</div><div className="py-2 text-gray-200">3</div><div className="py-2 hover:bg-gray-100 rounded-xl cursor-not-allowed text-gray-300">4</div><div className="py-2 hover:bg-gray-100 rounded-xl cursor-pointer">5</div><div className="py-2 hover:bg-gray-100 rounded-xl cursor-pointer">6</div><div className="py-2 text-gray-300">7</div>
                            <div className="py-2 text-gray-300">8</div><div className="py-2 bg-gray-200 rounded-xl text-black relative">9<span className="absolute bottom-[6px] right-1/2 translate-x-1/2 w-1 h-1 bg-black rounded-full"></span></div><div className="py-2 hover:bg-gray-100 rounded-xl">10</div><div className="py-2 hover:bg-gray-100 rounded-xl">11</div><div className="py-2 hover:bg-gray-100 rounded-xl">12</div><div className="py-2 bg-black text-white rounded-xl shadow-xl">13</div><div className="py-2 text-gray-300">14</div>
                            <div className="py-2 text-gray-300">15</div><div className="py-2 hover:bg-gray-100 rounded-xl">16</div><div className="py-2 hover:bg-gray-100 rounded-xl">17</div><div className="py-2 hover:bg-gray-100 rounded-xl">18</div><div className="py-2 bg-gray-200 rounded-xl">19</div><div className="py-2 hover:bg-gray-100 rounded-xl">20</div><div className="py-2 text-gray-300">21</div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-10 border-t border-gray-100 mt-20 flex justify-between items-center text-gray-400 text-sm font-medium">
                <div>© 2026 Cal by Shubham Jee Shrivastava</div>
                <div className="flex gap-6">
                    <span>Privacy</span>
                    <span>Terms</span>
                    <span>Contact</span>
                </div>
            </footer>
        </div>
    )
}
