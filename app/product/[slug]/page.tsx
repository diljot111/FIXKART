import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering so it fetches fresh data every time
export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  // 1. Fetch Product from DB
  const product = await prisma.product.findUnique({
    where: { slug: slug },
  });

  // If not found, show 404 page
  if (!product) {
    return notFound();
  }

  // Helper to safely handle the JSON specs
  const specs = (product.specs as Record<string, string>) || {};

  // --- CONTACT CONFIGURATION ---
  // REPLACE THIS WITH YOUR REAL NUMBER (Country code + Number, no + sign)
  const VENDOR_PHONE = "918699466669"; 
  
  // Construct the message
  const message = encodeURIComponent(
    `Hello, I am interested in buying: ${product.title}\nPrice: ₹${product.price}\nLink: ${process.env.NEXT_PUBLIC_BASE_URL || ''}/product/${slug}`
  );
  
  const whatsappUrl = `https://wa.me/${VENDOR_PHONE}?text=${message}`;
  const emailUrl = `mailto:info@thefixkart.com?subject=Inquiry: ${product.title}`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex text-sm text-gray-500 mb-6">
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
          <div className="w-full md:w-1/2 bg-gray-50/50 p-8 flex items-center justify-center border-r border-gray-100">
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
                ₹{product.price.toFixed(2)}
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
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description || "No description provided for this item."}
              </p>
            </div>

            {/* --- ACTION BUTTONS (UPDATED) --- */}
            <div className="flex flex-col gap-3 mt-auto">
              {/* 1. Main WhatsApp Button */}
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#00529b] text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Contact Vendor
              </a>
              
              <div className="flex gap-3">
                {/* 2. Email Button */}
                <a 
                  href={emailUrl}
                  className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                   Email Inquiry
                </a>
                
                {/* 3. Secondary WhatsApp Button */}
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-[#25D366] text-[#25D366] font-bold py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                   WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}