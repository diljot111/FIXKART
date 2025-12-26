import React from "react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
// 1. IMPORT THE CLIENT COMPONENT
import ProductActions from "../../components/ProductActions";

// Force dynamic rendering so it fetches fresh data every time
export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  // 2. Fetch Product from DB
  const product = await prisma.product.findUnique({
    where: { slug: slug },
  });

  // If not found, show 404 page
  if (!product) {
    return notFound();
  }

  // 3. Fetch Vendor Details (Safe Mode)
  // This prevents the page from crashing if the vendor ID is missing or invalid
  let vendor = null;
  if (product.vendorId) {
    try {
      const client = await clerkClient();
      vendor = await client.users.getUser(product.vendorId);
    } catch (error) {
      console.warn(`[VendorFetch] Could not find vendor details for product: ${product.slug}`);
      // vendor remains null, which is fine (UI handles it)
    }
  }

  // Helper to safely handle the JSON specs
  const specs = (product.specs as Record<string, string>) || {};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex text-sm text-gray-500 mb-6 flex-wrap gap-2">
          <Link href="/" className="hover:text-[#00529b] hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link 
            href={`/browse/${product.subCategory}`} 
            className="hover:text-[#00529b] hover:underline capitalize"
          >
            {product.subCategory}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-gray-800 capitalize line-clamp-1">{product.title}</span>
        </nav>

        {/* --- MAIN CARD --- */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="w-full md:w-1/2 bg-gray-50/50 p-8 flex items-center justify-center border-r border-gray-100 relative min-h-[400px]">
            <div className="relative w-full max-w-md aspect-square bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <Image 
                 src={product.image || "https://placehold.co/600?text=No+Image"}
                 alt={product.title}
                 fill
                 className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                 unoptimized
               />
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            
            {/* Title & Brand */}
            <div className="mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {product.subSubCategory || product.subCategory}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#00529b] mt-1 leading-tight">
                {product.title}
              </h1>
              {product.brand && (
                <p className="text-sm text-gray-500 mt-2">Brand: <span className="font-semibold text-gray-700">{product.brand}</span></p>
              )}
            </div>

            {/* Price & Stock */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                product.quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            {/* Specifications Grid */}
            {Object.keys(specs).length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-gray-50 p-4 rounded-lg text-sm">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-gray-400 text-xs capitalize">{key}</span>
                      <span className="font-semibold text-gray-700 capitalize">{value}</span>
                    </div>
                  ))}
                  {product.sku && (
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs uppercase">SKU</span>
                      <span className="font-semibold text-gray-700">{product.sku}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8 flex-1">
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {product.description || "No description provided for this item."}
              </p>
            </div>

            {/* --- ACTION BUTTONS (UPDATED) --- */}
            <div className="mt-auto">
               <ProductActions product={product} vendor={vendor} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}