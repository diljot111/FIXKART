"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle the typing event
  const handleSearch = (term: string) => {
    // 1. Get existing params so we don't lose other data
    const params = new URLSearchParams(searchParams.toString());

    // 2. If term exists, set it. If empty, delete it.
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    // 3. Update the URL instantly without reloading the page
    // { scroll: false } prevents the page from jumping to the top on every letter
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center border border-transparent rounded bg-white px-3 py-1.5 focus-within:ring-2 focus-within:ring-white/90 transition-shadow w-full shadow-sm">
      <input 
        type="text" 
        placeholder="Search products..." 
        className="flex-grow bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-500 min-w-0"
        
        // This is the key part:
        onChange={(e) => handleSearch(e.target.value)}
        
        // Keep the input in sync with the URL
        defaultValue={searchParams.get('q')?.toString()}
      />
      <button className="ml-2 text-gray-500 hover:text-[#00529b]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>
    </div>
  );
}