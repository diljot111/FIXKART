import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import SearchBar from "./components/Searchbar";
import {
  LayoutGrid,
  Package,
  Wallet,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

/* =========================
   FONT CONFIG
========================= */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================
   SEO METADATA (NO UI IMPACT)
========================= */
export const metadata: Metadata = {
  title: {
    default: "FixKart | Industrial Fasteners & Hardware Supplier in India",
    template: "%s | FixKart",
  },

  description:
    "FixKart is a trusted industrial fasteners and hardware supplier in India. Buy nuts, bolts, stainless steel fasteners, high tensile bolts, and industrial components with fast nationwide delivery.",

  keywords: [
    "industrial fasteners supplier india",
    "nuts and bolts supplier",
    "industrial hardware supplier",
    "stainless steel fasteners",
    "high tensile bolts",
    "bulk fasteners supplier",
    "custom fasteners manufacturer",
    "industrial components supplier",
  ],

  applicationName: "FixKart",
  category: "Industrial Supplies",
  creator: "FixKart",
  publisher: "FixKart",

  metadataBase: new URL("https://www.thefixkart.com"),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "FixKart | Industrial Fasteners Supplier in India",
    description:
      "Buy premium industrial fasteners, nuts & bolts, stainless steel fasteners and industrial hardware from FixKart.",
    url: "https://www.thefixkart.com",
    siteName: "FixKart",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/fixkart-og.png",
        width: 1200,
        height: 630,
        alt: "FixKart Industrial Fasteners Supplier in India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FixKart | Industrial Fasteners Supplier in India",
    description:
      "Industrial fasteners, nuts & bolts and hardware supplier in India.",
    images: ["/fixkart-og.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "", // ← paste Google Search Console code later
  },
};

/* =========================
   ROOT LAYOUT
========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800 bg-gray-50`}
      >
        <ClerkProvider>
          {/* =========================
              SEO ORGANIZATION SCHEMA
              (NO UI OUTPUT)
          ========================= */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://www.thefixkart.com/#organization",
                name: "FixKart",
                url: "https://www.thefixkart.com",
                logo: "https://www.thefixkart.com/fixkart-logo2.png",
                description:
                  "FixKart is an industrial fasteners and hardware supplier in India providing nuts, bolts, stainless steel fasteners, and custom industrial components.",
                sameAs: [
                  "https://www.facebook.com/",
                  "https://www.linkedin.com/",
                  "https://www.instagram.com/",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-8699466669",
                  contactType: "customer support",
                  areaServed: "IN",
                  availableLanguage: ["English"],
                },
              }),
            }}
          />

          {/* =========================
              HEADER (UNCHANGED)
          ========================= */}
          <header className="sticky top-0 z-50 shadow-md">
            <div className="w-full bg-[#00529b] border-b border-[#004a8f] py-3 text-white">
              <div className="px-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
                <Link href="/" className="ml-8 md:ml-0">
                  <img
                    src="/fixkart-logo2.png"
                    alt="FixKart Industrial Fasteners Supplier"
                    className="h-8 md:h-10 w-auto"
                  />
                </Link>

                <div className="w-full md:flex-1 max-w-3xl">
                  <SearchBar />
                </div>

                <div className="flex items-center gap-2">
                  <SignedOut>
                    <SignInButton>
                      <button className="font-bold text-sm">Sign in</button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="bg-[#ffc20e] text-black px-4 py-1.5 rounded font-bold">
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

            <div className="bg-white border-b">
              <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex justify-between py-2 text-sm font-bold text-gray-600">
                <div className="flex gap-4">
                  <Link href="/browse" className="flex items-center gap-2">
                    <LayoutGrid size={18} /> All Catalog
                  </Link>
                  <Link href="/find-branch" className="flex items-center gap-2">
                    <MapPin size={18} /> Find My Branch
                  </Link>
                </div>

                <div className="flex gap-4">
                  <Link href="/bulk-order" className="flex items-center gap-2">
                    <Package size={18} /> Bulk Order
                  </Link>
                  <Link href="/wallet" className="flex items-center gap-2">
                    <Wallet size={18} /> Wallet
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* =========================
              MAIN CONTENT
          ========================= */}
          <main className="min-h-screen px-4 md:px-6 py-6">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
