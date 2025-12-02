"use client";

import React, { Suspense, useState, useEffect, useMemo, useCallback } from 'react'; 
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { INVENTORY_DATA, SIDEBAR_LINKS } from './data/inventory'; // Ensure this path is correct
import { ProductItem } from './data/types';

// --- CONFIGURATION ---
const BRAND_BLUE = "#00529b";
const HEADER_HEIGHT_OFFSET = 150; // Distance from top to stop scrolling
const MOBILE_MENU_TOP = "115px";  // Starts below your double header

// --- SUB-COMPONENT: HANDLES LOGIC ---
function InventoryContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || "";
  
  // 1. STATE: Track active category
  const [activeCategory, setActiveCategory] = useState<string>("");

  // 2. PERFORMANCE: Memoize the filtered data
  // This prevents re-filtering the entire list every time you scroll (huge speed boost)
  const filteredData = useMemo(() => {
    if (!searchQuery) return INVENTORY_DATA;

    return INVENTORY_DATA.map(category => {
      // Filter items within the category
      const matchingItems = category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery)
      );
      // Return new category object with filtered items
      return { ...category, items: matchingItems };
    }).filter(category => category.items.length > 0); // Remove empty categories
  }, [searchQuery]);

  // 3. EFFECT: Intersection Observer (The Watcher)
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
            
            // Auto-scroll the mobile nav pill into view
            const navBtn = document.getElementById(`nav-btn-${entry.target.id}`);
            if (navBtn) {
                navBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
          }
        });
      },
      {
        // Triggers when the element is near the top of the viewport
        rootMargin: '-140px 0px -60% 0px', 
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [filteredData]); // Re-run if data changes (e.g., search result changes)

  // 4. HANDLER: Smooth Scroll with precise offset
  const handleScroll = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveCategory(id); // Instant UI feedback
    
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT_OFFSET;
      
      window.scrollTo({ 
        top: offsetPosition, 
        behavior: "smooth" 
      });
    }
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row relative">
      
      {/* ========================================= */}
      {/* 1. MOBILE CATEGORY NAV (Optimized)        */}
      {/* ========================================= */}
      <div 
        className="md:hidden sticky z-40 w-full border-b border-gray-200 shadow-sm transition-all duration-300 backdrop-blur-md bg-white/95"
        style={{ top: MOBILE_MENU_TOP }}
      >
        <div className="flex overflow-x-auto whitespace-nowrap p-3 gap-2 hide-scrollbar">
          {SIDEBAR_LINKS.map((linkName, index) => {
             // Find slug from original data to ensure links work even if filtered
             const catSlug = INVENTORY_DATA.find(c => c.title === linkName)?.slug || "";
             
             // Check if this category actually exists in current view (for graying out if empty)
             const existsInView = filteredData.some(c => c.slug === catSlug);
             const isActive = activeCategory === catSlug;

             if (!existsInView && searchQuery) return null; // Hide empty categories during search

             return (
               <a
                 key={index}
                 id={`nav-btn-${catSlug}`}
                 href={`#${catSlug}`}
                 onClick={(e) => handleScroll(e, catSlug)}
                 className={`
                    px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 select-none
                    ${isActive 
                        ? "bg-[#00529b] text-white border-[#00529b] shadow-md scale-105" 
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }
                 `}
               >
                 {linkName}
               </a>
             );
          })}
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. DESKTOP SIDEBAR (Sticky)               */}
      {/* ========================================= */}
      <aside className="hidden md:block w-64 flex-shrink-0 py-4 pl-4 pr-6 border-r border-gray-200 sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar">
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-[#ffc20e] pb-1 mb-3">
          Choose a Category
        </h2>
        <ul className="space-y-1 text-[13px] leading-tight text-gray-700">
          {SIDEBAR_LINKS.map((linkName, index) => {
            const catSlug = INVENTORY_DATA.find(c => c.title === linkName)?.slug || "";
            const existsInView = filteredData.some(c => c.slug === catSlug);
            const isActive = activeCategory === catSlug;

            if (!existsInView && searchQuery) return null;

            return (
              <li key={index}>
                <a 
                  href={`#${catSlug}`}
                  onClick={(e) => handleScroll(e, catSlug)}
                  className={`
                    block px-2 py-1 rounded transition-all duration-200 cursor-pointer select-none
                    ${isActive 
                        ? "bg-[#e6f0fa] text-[#00529b] font-bold border-l-4 border-[#00529b] pl-3" 
                        : "hover:bg-gray-100 hover:text-[#00529b] border-l-4 border-transparent"
                    }
                  `}
                >
                  {linkName}
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-4 md:p-6 min-h-screen">
        
        {searchQuery && (
           <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-gray-700 animate-fade-in">
              Showing results for: <strong>"{searchQuery}"</strong>
              <a href="/" className="ml-4 text-blue-600 font-semibold hover:underline">Clear Search</a>
           </div>
        )}

        {filteredData.map((category) => (
            <section 
                key={category.slug} 
                id={category.slug} 
                className="mb-12 scroll-mt-48 md:scroll-mt-24 transition-opacity duration-500"
            >
              <div className="border-b border-gray-300 pb-2 mb-6">
                <h1 className="text-xl md:text-2xl font-bold" style={{ color: BRAND_BLUE }}>
                  {category.title}
                </h1>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
                {category.items.map((item, idx) => (
                  <ProductCard key={`${category.slug}-${idx}`} item={item} />
                ))}
              </div>
            </section>
        ))}
        
        {searchQuery && filteredData.length === 0 && (
           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <span className="text-4xl mb-2">🔍</span>
              <h2 className="text-xl font-semibold text-gray-600">No products found</h2>
              <p className="text-sm">Try checking your spelling or use a different keyword.</p>
           </div>
        )}
      </main>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Spacer for fixed header */}
      <div className="w-full h-auto"></div> 
      
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-[#00529b] font-medium animate-pulse">
            Loading Inventory...
        </div>
      }>
        <InventoryContent />
      </Suspense>
    </div>
  );
}

// --- PRODUCT CARD COMPONENT ---
// Memoized to prevent re-rendering identical cards when other parts of the UI update
const ProductCard = React.memo(function ProductCard({ item }: { item: ProductItem }) {
  const encodedName = encodeURIComponent(item.name);
  const fallbackUrl = `https://placehold.co/400x400/f3f4f6/00529b.png?text=${encodedName}&font=roboto`;
  const imageSource = item.imagePath ? item.imagePath : fallbackUrl;

  return (
    <div className="flex flex-col items-center group cursor-pointer w-full h-full">
      <div className="aspect-square w-full max-w-[120px] bg-white border border-gray-200 rounded-lg mb-2 flex items-center justify-center overflow-hidden relative shadow-sm group-hover:shadow-md transition-all duration-300 ease-out">
        <Image 
            src={imageSource}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300 ease-in-out"
            unoptimized={true}
            loading="lazy"
        />
      </div>
      <span className="text-[12px] text-center leading-tight text-gray-700 font-medium group-hover:text-[#00529b] px-1 break-words w-full transition-colors duration-200">
        {item.name}
      </span>
    </div>
  );
});