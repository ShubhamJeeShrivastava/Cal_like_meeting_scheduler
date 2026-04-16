import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cal by Shubham",
  description: "Cal by Shubham – A scheduling app to manage your events, meetings, and availability. Let others book time with you effortlessly.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='white'/><rect x='15' y='20' width='70' height='65' rx='10' fill='%23111'/><rect x='15' y='20' width='70' height='25' rx='8' fill='%23111'/><path d='M35 12v15M65 12v15' stroke='%23111' stroke-width='8' stroke-linecap='round'/><rect x='30' y='55' width='12' height='12' rx='2' fill='white'/><rect x='44' y='55' width='12' height='12' rx='2' fill='white'/><rect x='58' y='55' width='12' height='12' rx='2' fill='white'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased animate-fade-in`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
