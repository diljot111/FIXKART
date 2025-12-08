"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import VendorModal from "@/components/VendorModal"; 
import { INVENTORY_DATA, SIDEBAR_LINKS } from "@/app/data/inventory"; 

// --- CONFIGURATION ---
const BRAND_BLUE = "#00529b";
const STICKY_HEADER_TOP = "115px";
const HEADER_HEIGHT_OFFSET = 160;

// --- UTILS ---
const toSlug = (text: string) =>
  text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

// --- ICONS ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
);

// --- MAIN COMPONENT ---
export default function InventoryContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  // 1. STATE
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  // 2. FILTERING STATIC DATA
  const filteredData = useMemo(() => {
    if (!searchQuery) return INVENTORY_DATA;
    return INVENTORY_DATA.map((category) => {
      const matchingItems = category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
      return { ...category, items: matchingItems };
    }).filter((category) => category.items.length > 0);
  }, [searchQuery]);

  // 3. SCROLL SPY
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategorySlug(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [filteredData]);

  // 4. SMOOTH SCROLL HANDLER
  const handleScroll = useCallback(
    (e: React.MouseEvent, id: string, closeMenu?: boolean) => {
      e.preventDefault();
      setActiveCategorySlug(id);
      if (closeMenu) setIsMobileMenuOpen(false);

      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - HEADER_HEIGHT_OFFSET;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    },
    []
  );

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  return (
    <div className="w-full flex flex-col md:flex-row relative min-h-screen">
      
      {/* --- VENDOR MODAL --- */}
      <VendorModal 
        isOpen={isVendorModalOpen} 
        onClose={() => setIsVendorModalOpen(false)} 
      />

      {/* --- FLOATING VENDOR BUTTON --- */}
      <button
        onClick={() => setIsVendorModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center gap-2 border-2 border-white/20 backdrop-blur-sm"
      >
        <span>+ Post Item</span>
      </button>

      {/* --- MOBILE MENU TRIGGER --- */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed z-40 right-4 p-2 px-4 bg-[#00529b] text-white rounded-full shadow-lg hover:bg-blue-800 transition-all flex items-center gap-2 border-2 border-white/20 backdrop-blur-sm"
        style={{ top: "120px" }}
      >
        <MenuIcon />
      </button>

      {/* --- MOBILE DRAWER --- */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h2 className="text-lg font-bold text-[#00529b]">Categories</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-gray-500">
            <XIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {SIDEBAR_LINKS.map((linkName, index) => {
              const catSlug = INVENTORY_DATA.find((c) => c.title === linkName)?.slug || "";
              const existsInView = filteredData.some((c: any) => c.slug === catSlug);
              const isActive = activeCategorySlug === catSlug;
              
              if (!existsInView && searchQuery) return null;

              return (
                <li key={index}>
                  <a
                    href={`#${catSlug}`}
                    onClick={(e) => handleScroll(e, catSlug, true)}
                    className={`block px-3 py-3 rounded-lg text-sm transition-all duration-200 font-medium ${
                      isActive ? "bg-blue-50 text-[#00529b] border-l-4 border-[#00529b]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {linkName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:block w-64 shrink-0 py-6 pl-6 pr-4 border-r border-gray-200 sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar">
        <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">
          Browse Categories
        </h2>
        <ul className="space-y-1 text-[13px] leading-tight text-gray-700">
          {SIDEBAR_LINKS.map((linkName, index) => {
            const catSlug = INVENTORY_DATA.find((c) => c.title === linkName)?.slug || "";
            const existsInView = filteredData.some((c: any) => c.slug === catSlug);
            const isActive = activeCategorySlug === catSlug;

            if (!existsInView && searchQuery) return null;

            return (
              <li key={index}>
                <a
                  href={`#${catSlug}`}
                  onClick={(e) => handleScroll(e, catSlug)}
                  className={`block px-3 py-2 rounded-md transition-all duration-200 cursor-pointer select-none ${
                    isActive ? "bg-[#e6f0fa] text-[#00529b] font-bold" : "hover:bg-gray-100 hover:text-[#00529b]"
                  }`}
                >
                  {linkName}
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-4 md:p-8 min-h-screen bg-gray-50/30">
        {searchQuery && (
          <div className="mb-8 p-4 bg-white border border-yellow-200 rounded-lg shadow-sm text-sm text-gray-700 flex items-center justify-between">
            <span>Results for: <strong>"{searchQuery}"</strong></span>
            <Link href="/" className="text-blue-600 text-xs font-bold uppercase hover:underline">Clear</Link>
          </div>
        )}

        {filteredData.map((category: any) => (
          <section
            key={category.slug}
            id={category.slug}
            className="mb-10 scroll-mt-48 md:scroll-mt-24"
          >
            <div
              className="sticky z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 mb-6 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent md:border-none"
              style={{ top: STICKY_HEADER_TOP }}
            >
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#00529b] rounded-full inline-block"></span>
                {category.title}
              </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-8">
              {category.items.map((item: any, idx: number) => (
                <Link
                  // FIX 1: Add item.name to the key to force re-render when data changes
                  key={`${category.slug}-${item.name}-${idx}`}
                  href={`/browse/${toSlug(item.name)}`} 
                >
                  <ProductCard item={item} />
                </Link>
              ))}
            </div>
          </section>
        ))}

        {searchQuery && filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="text-4xl mb-4">🔍</span>
            <h2 className="text-lg font-semibold text-gray-600">No products found</h2>
          </div>
        )}
      </main>
    </div>
  );
}

// --- SUB-COMPONENT: PRODUCT CARD ---
const ProductCard = React.memo(function ProductCard({
  item,
}: {
  item: any; 
}) {
  const encodedName = encodeURIComponent(item.name);
  
  // Logic to determine image source
  let primaryPath = item.imagePath ? item.imagePath.replace(/\\/g, "/") : "";
  if (primaryPath && !primaryPath.startsWith("/") && !primaryPath.startsWith("http")) {
    primaryPath = "/" + primaryPath;
  }
  const fallbackUrl = `https://placehold.co/400x400/f3f4f6/00529b.png?text=${encodedName}&font=roboto`;
  
  // FIX 2: Initialize state directly. No useEffect needed because the parent 'key' forces a fresh mount.
  const [imgSrc, setImgSrc] = useState(primaryPath || fallbackUrl);

  return (
    <div className="flex flex-col items-center group cursor-pointer w-full h-full bg-white rounded-lg p-2 transition-all hover:bg-white hover:shadow-lg relative">
      <div className="aspect-square w-full max-w-[120px] bg-white border border-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative shadow-sm">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          unoptimized={true}
          onError={() => setImgSrc(fallbackUrl)} // This is still allowed
        />
      </div>
      <span className="text-[13px] text-center leading-snug font-medium px-1 line-clamp-2 text-gray-600 group-hover:text-[#00529b]">
        {item.name}
      </span>
    </div>
  );
});