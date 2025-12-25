import React from "react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server"; 
import { INVENTORY_DATA } from "@/app/data/inventory"; // <--- MAKE SURE THIS IS IMPORTED

export const dynamic = "force-dynamic";

export default async function BrowseSubCategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const { userId } = await auth();

  // --- SMART SEARCH LOGIC START ---
  let searchTerm = "";
  let displayTitle = "";
  
  // 1. Helper to clean up the slug (e.g. "Wire--Cable" -> "wirecable")
  const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const targetSlug = normalize(slug);

  // 2. Try to find if the slug is a MAIN Category (e.g. "Fastening & Joining")
  const mainCategory = INVENTORY_DATA.find(c => normalize(c.slug) === targetSlug);

  if (mainCategory) {
    // Exact match for a Main Category
    searchTerm = mainCategory.title;
    displayTitle = mainCategory.title;
  } else {
    // 3. Fallback: Check if the slug is actually an ITEM inside a category (e.g. "Anchors")
    for (const cat of INVENTORY_DATA) {
      const itemMatch = cat.items.find(item => normalize(item.name) === targetSlug);
      
      if (itemMatch) {
        searchTerm = cat.title;       // Search DB for parent: "Fastening & Joining"
        displayTitle = itemMatch.name; // Display title: "Anchors"
        break;
      }
    }
  }

  // 4. Last Resort: If not found in data, just use the slug text
  if (!searchTerm) {
    searchTerm = slug.replace(/-/g, ' ');
    displayTitle = searchTerm;
  }
  // --- SMART SEARCH LOGIC END ---


  // 5. Fetch Products from DB using the CORRECT Parent Category
  const products = await prisma.product.findMany({
    where: {
      subCategory: {
        contains: searchTerm, 
        mode: 'insensitive' 
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // 6. FILTERING (Crucial!)
  // If user visited /anchors, we fetched ALL "Fastening & Joining" items.
  // Now we must hide everything that isn't an Anchor.
  const filteredProducts = products.filter(product => {
     // If we are on the Main Category page, show everything
     if (displayTitle === searchTerm) return true;

     // If we are on an Item page (e.g. Anchors), only show items where subSubCategory is "Anchors"
     // We use a loose check here to be safe
     return normalize(product.subSubCategory || "") === normalize(displayTitle);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-[#00529b]">← Back to Home</Link>
        <h1 className="text-3xl font-bold text-[#00529b] capitalize mt-2">
          {displayTitle} Inventory
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No products found in "{displayTitle}".</p>
          </div>
        ) : (
          /* We don't need to Group by section here if we are filtered down to one item type, 
             but a grid layout is always good. */
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md transition-all relative group">
                
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="relative aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <Image 
                      src={product.image || "https://placehold.co/400?text=No+Image"} 
                      alt={product.name} 
                      fill 
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight min-h-[2.5em]">
                    {product.title || product.name}
                  </h3>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[#00529b] font-bold text-sm">₹{product.price}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      Qty: {product.quantity}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}