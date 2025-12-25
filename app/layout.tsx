import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import SearchBar from "./components/Searchbar";
import { 
  LayoutGrid, 
  Package, 
  Wallet, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle 
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixKart",
  description: "Industrial Supply Catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800 bg-gray-50`}>

        <ClerkProvider>
          {/* --- HEADER CONTAINER --- */}
          <header className="sticky top-0 z-50 shadow-md">
            
            {/* ROW 1: MAIN BLUE BAR */}
            <div className="w-full bg-[#00529b] border-b border-[#004a8f] py-3 text-white relative z-50">
              <div className="w-full px-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
                
                {/* 1. Logo */}
                {/* Added 'ml-8 md:ml-0' to make space for Hamburger on mobile */}
                <Link href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity ml-8 md:ml-0">
                  <img 
                    src="/fixkart-logo2.png" 
                    alt="FixKart" 
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </Link>

                {/* 2. Search Bar */}
                <div className="order-last md:order-none w-full md:flex-1 max-w-3xl mx-0 md:mx-4 mt-2 md:mt-0">
                  <SearchBar />
                </div>

                {/* 3. Right Actions */}
                <div className="flex items-center gap-4 text-sm font-semibold whitespace-nowrap ml-auto md:ml-0">
                  
                  {/* TRACK SALESMAN (Hidden on Mobile to save space) */}
                  {/* <div className="hidden lg:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                    <Truck size={18} className="text-[#ffc20e]" />
                    <span className="text-white font-bold tracking-wide">Track Salesman</span>
                    <span className="bg-[#ffc20e] text-[#00529b] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                      SOON
                    </span>
                  </div> */}

                  {/* Auth Buttons */}
                  <div className="flex items-center gap-2">
                    <SignedOut>
                      <SignInButton>
                        <button className="hover:text-gray-200 font-bold text-xs md:text-sm">Sign in</button>
                      </SignInButton>
                      <SignUpButton>
                        <button className="bg-[#ffc20e] text-black px-3 py-1.5 md:px-4 rounded font-bold hover:bg-yellow-500 transition-colors shadow-sm text-xs md:text-sm">
                          Sign up
                        </button>
                      </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: WHITE SUB-NAVBAR */}
            <div className="w-full bg-white border-b border-gray-200 shadow-sm relative z-40">
              <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                
                <div className="flex items-center justify-between py-2 overflow-x-auto md:overflow-visible scrollbar-hide">
                  
                  {/* LEFT SIDE ITEMS */}
                  <div className="flex items-center gap-2 md:gap-4 text-sm font-bold text-gray-600 whitespace-nowrap">
                    <Link href="/catalog" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-blue-50 hover:text-[#00529b] transition-all group">
                      <LayoutGrid size={18} className="group-hover:text-[#00529b]" />
                      <span>All Catalog</span>
                    </Link>
                    <Link href="/find-branch" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 hover:text-gray-900 transition-all group">
                      <MapPin size={18} className="group-hover:text-[#00529b]" />
                      <span>Find My Branch</span>
                    </Link>
                  </div>

                  {/* RIGHT SIDE ITEMS */}
                  <div className="flex items-center gap-2 md:gap-4 text-sm font-bold text-gray-600 whitespace-nowrap ml-auto">
                    {/* Contact Us */}
                    <div className="relative group">
                      <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer">
                        <Phone size={18} className="group-hover:text-[#00529b]" />
                        <span>Contact Us</span>
                      </button>
                      <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-[100] overflow-hidden">
                        <div className="py-1">
                          <a href="mailto:support@fixkart.com" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-[#00529b] transition-colors">
                            <Mail size={16} /><span>Email Support</span>
                          </a>
                          <a href="https://wa.me/918699466669" target="_blank" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors border-t border-gray-100">
                            <MessageCircle size={16} /><span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link href="/bulk-order" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all group">
                      <Package size={18} className="group-hover:text-orange-600" />
                      <span>Bulk Order</span>
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded ml-1">HOT</span>
                    </Link>

                    <Link href="/wallet" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-blue-50 hover:text-[#00529b] transition-all group">
                      <Wallet size={18} className="group-hover:text-[#00529b]" />
                      <span>My Wallet</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-[calc(100vh-115px)] w-full">
            <div className="w-full px-4 md:px-6 py-6">
              {children}
            </div>
          </main>

        </ClerkProvider>
      </body>
    </html>
  );
}