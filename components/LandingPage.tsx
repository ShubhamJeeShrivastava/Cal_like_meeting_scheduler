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
                    <div className="font-black text-2xl tracking-tighter">Cal.com</div>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <span className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors">Solutions <span className="text-[10px]">▼</span></span>
                        <span className="cursor-pointer hover:text-black transition-colors">Enterprise</span>
                        <span className="cursor-pointer hover:text-black transition-colors">Cal.ai</span>
                        <span className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors">Developer <span className="text-[10px]">▼</span></span>
                        <span className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors">Resources <span className="text-[10px]">▼</span></span>
                        <span className="cursor-pointer hover:text-black transition-colors">Pricing</span>
                    </div>
                </div>
                {/* Replaced login with a direct link to the app since login is removed */}
                <Link href="/events" className="bg-[#111111] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md">
                    Go to app <ChevronRight size={16} />
                </Link>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-8 pt-12 flex flex-col lg:flex-row gap-16 items-center">
                
                {/* Left side texts */}
                <div className="flex-1 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f6f6f6] border border-gray-200 rounded-full text-sm font-medium mb-6 cursor-pointer hover:bg-gray-200 transition-colors">
                        Cal.com launches v6.4 <ArrowRight size={14} className="text-gray-500"/>
                    </div>
                    
                    <h1 className="text-[64px] lg:text-[76px] font-black leading-[1.02] tracking-tighter mb-6 text-[#111111]">
                        The better way to schedule your meetings
                    </h1>
                    
                    <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-[420px] font-medium">
                        A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.
                    </p>
                    
                    <div className="flex flex-col gap-3 max-w-[340px]">
                        <Link href="/events" className="flex items-center justify-center gap-2 w-full bg-[#1e1e1e] hover:bg-black text-white py-3.5 px-4 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer">
                            <span className="bg-white rounded-full p-[2px] w-5 h-5 flex items-center justify-center text-[#1e1e1e] font-bold text-xs">G</span>
                            Sign up with Google
                        </Link>
                        <Link href="/events" className="flex items-center justify-center gap-2 w-full bg-[#f6f6f6] hover:bg-[#eaeaea] text-black py-3.5 px-4 rounded-lg font-semibold transition-all active:scale-[0.98] cursor-pointer">
                            Sign up with email <ChevronRight size={16} className="text-gray-400"/>
                        </Link>
                        <p className="text-xs text-gray-400 mt-2 font-medium">No credit card required</p>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-10">
                        <div>
                            <div className="flex text-[#00b67a] mb-1 gap-[2px]">
                                <span className="bg-[#00b67a] text-white p-[2px] rounded-sm text-xs w-4 h-4 flex items-center justify-center">★</span>
                                <span className="bg-[#00b67a] text-white p-[2px] rounded-sm text-xs w-4 h-4 flex items-center justify-center">★</span>
                                <span className="bg-[#00b67a] text-white p-[2px] rounded-sm text-xs w-4 h-4 flex items-center justify-center">★</span>
                                <span className="bg-[#00b67a] text-white p-[2px] rounded-sm text-xs w-4 h-4 flex items-center justify-center">★</span>
                                <span className="bg-[#00b67a] text-white p-[2px] rounded-sm text-xs w-4 h-4 flex items-center justify-center select-none text-transparent relative overflow-hidden"><span className="absolute bg-[#00b67a] text-white w-2 overflow-hidden block">★</span></span>
                            </div>
                            <div className="text-sm font-bold text-black flex items-center gap-1"><span className="text-[#00b67a] text-xl">★</span> Trustpilot</div>
                        </div>
                    </div>
                </div>

                {/* Right side mock UI */}
                <div className="flex-1 lg:max-w-[800px] w-full border border-gray-200 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-white overflow-hidden flex flex-col sm:flex-row transform transition hover:translate-y-[-4px] duration-500">
                    <div className="sm:w-1/2 p-8 border-r border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-full overflow-hidden mb-5 border border-gray-200 shadow-sm relative bg-gray-100">
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-500">MO</div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-500 mb-1">Michael Oliver</h3>
                            <h2 className="text-2xl font-bold mb-3 tracking-tight">Legal Consultation</h2>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                Discuss your legal matters with our experienced attorneys in a private consultation.
                            </p>
                        </div>
                        
                        <div className="space-y-4 text-sm text-gray-600 font-medium">
                            <div className="flex items-center gap-3">
                                <Clock size={16} className="text-gray-400"/>
                                <div className="flex p-0.5 bg-gray-100/80 rounded-lg text-xs gap-0">
                                    <span className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-200/50 cursor-pointer">15m</span>
                                    <span className="px-3 py-1.5 bg-white rounded-md shadow-sm text-black font-semibold">30m</span>
                                    <span className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-200/50 cursor-pointer">45m</span>
                                    <span className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-200/50 cursor-pointer">1h</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-[#2D8CFF] p-1 rounded border border-[#2D8CFF]/20 shadow-sm text-white font-bold tracking-tighter text-[8px] leading-[8px] w-4 h-4 flex items-center justify-center">
                                    Z
                                </div>
                                Zoom
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">🌍</span> Europe/London <span className="text-[10px] text-gray-400">▼</span>
                            </div>
                        </div>
                    </div>

                    <div className="sm:w-1/2 p-8 bg-[#fafafa]">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-base">May <span className="text-gray-400 font-medium">2025</span></span>
                            <div className="flex gap-2">
                                <ChevronRight size={16} className="text-gray-400 rotate-180" />
                                <ChevronRight size={16} className="text-gray-800" />
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 font-medium mb-3">
                            <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1.5 text-center text-sm font-medium">
                            {/* Dummy Calendar Days */}
                            <div className="py-2 text-gray-300"></div><div className="py-2 text-gray-300"></div><div className="py-2 text-gray-300"></div><div className="py-2 text-gray-300"></div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">1</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">2</div><div className="py-2 text-gray-400 font-normal">3</div>
                            <div className="py-2 text-gray-400 font-normal">4</div><div className="py-2 bg-gray-200/80 rounded-md text-black relative cursor-pointer hover:bg-gray-200 transition">5<span className="absolute bottom-[3px] right-1/2 translate-x-1/2 w-1 h-1 bg-black rounded-full"></span></div><div className="py-2 bg-gray-100 rounded-md text-gray-400 cursor-default">6</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">7</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">8</div><div className="py-2 bg-[#111111] text-white rounded-md cursor-pointer hover:bg-black transition shadow-sm">9</div><div className="py-2 text-gray-400 font-normal">10</div>
                            <div className="py-2 text-gray-400 font-normal">11</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">12</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">13</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">14</div><div className="py-2 bg-gray-200/80 text-black rounded-md relative cursor-pointer hover:bg-gray-200 transition">15<span className="absolute bottom-[3px] right-1/2 translate-x-1/2 w-1 h-1 bg-black rounded-full"></span></div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">16</div><div className="py-2 text-gray-400 font-normal">17</div>
                            <div className="py-2 text-gray-400 font-normal">18</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">19</div><div className="py-2 bg-gray-100 text-gray-400 rounded-md cursor-default">20</div><div className="py-2 bg-gray-100 rounded-md text-gray-400 cursor-default">21</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">22</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">23</div><div className="py-2 text-gray-400 font-normal">24</div>
                            <div className="py-2 text-gray-400 font-normal">25</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">26</div><div className="py-2 bg-gray-100 text-gray-400 rounded-md cursor-default">27</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">28</div><div className="py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">29</div><div className="py-2 bg-gray-100 text-gray-400 rounded-md cursor-default">30</div><div className="py-2 text-gray-400 font-normal">31</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
