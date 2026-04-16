import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0f0f10] flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-6xl font-black mb-4 tracking-tighter">404</h1>
            <p className="text-[#939393] mb-8 text-lg">Oops! This page doesn't exist.</p>
            <Link 
                href="/" 
                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-all"
            >
                Go back home
            </Link>
        </div>
    )
}
