import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function PublicNavBar() {
    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-16 bg-[#0f0f10]/80 backdrop-blur-md border-b border-[#262626] px-10 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
                <div className="bg-white p-1 rounded-md group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-white tracking-tight text-lg">
                    Cal <span className="text-[#939393] font-normal text-sm">by Shubham</span>
                </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-4">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="text-sm font-medium text-[#939393] hover:text-white transition-colors">
                            Sign in
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <Link 
                        href="/events" 
                        className="text-sm font-medium px-4 py-2 bg-white text-black rounded-lg hover:bg-[#ededed] transition-colors"
                    >
                        Dashboard
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </nav>
    )
}