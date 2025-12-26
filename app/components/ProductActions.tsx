"use client";

import React, { useState } from "react";
import { ShoppingCart, MessageCircle, Phone, Mail, Check, ShieldCheck, LogIn } from "lucide-react";
import { useCart } from "./../context/CartContext";
import { useUser, SignInButton } from "@clerk/nextjs"; // <--- Import Clerk

interface ProductActionsProps {
  product: any;
  vendor: any;
}

export default function ProductActions({ product, vendor }: ProductActionsProps) {
  const { addToCart } = useCart();
  const { isSignedIn } = useUser(); // <--- Check login status
  
  const [isAdded, setIsAdded] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);

  const handleAddToCart = () => {
    if (!isSignedIn) return; // Logic barrier
    
    addToCart(product, selectedQty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Vendor Data Handling (Safety Check)
  const vendorName = vendor?.firstName 
    ? `${vendor.firstName} ${vendor.lastName || ''}` 
    : "Verified Seller"; // Fallback name if vendor lookup fails
    
  const vendorPhone = vendor?.unsafeMetadata?.phone || "918699466669";
  const vendorEmail = vendor?.emailAddresses?.[0]?.emailAddress || "support@fixkart.com";

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- ADD TO CART SECTION --- */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <label className="text-sm font-bold text-gray-700">Quantity:</label>
           <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setSelectedQty(q => Math.max(1, q - 1))} className="px-3 py-1 font-bold hover:bg-white rounded-md transition-colors">-</button>
              <span className="font-bold w-8 text-center">{selectedQty}</span>
              <button onClick={() => setSelectedQty(q => Math.min(product.quantity, q + 1))} className="px-3 py-1 font-bold hover:bg-white rounded-md transition-colors">+</button>
           </div>
        </div>

        {/* CONDITIONAL BUTTON RENDER */}
        {isSignedIn ? (
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className={`w-full text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] ${
              isAdded 
                ? "bg-green-600 hover:bg-green-700" 
                : product.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#00529b] hover:bg-blue-800"
            }`}
          >
            {product.quantity === 0 ? "Out of Stock" : isAdded ? <><Check size={24} /> Added!</> : <><ShoppingCart size={24} /> Add to Cart</>}
          </button>
        ) : (
          <SignInButton mode="modal">
            <button className="w-full bg-[#ffc20e] text-black font-bold text-lg py-4 rounded-xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 shadow-md">
              <LogIn size={24} /> Sign in to Buy
            </button>
          </SignInButton>
        )}
        
         <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-green-600"/> Secure Transaction
         </p>
      </div>

      <hr className="border-gray-100" />

      {/* --- VENDOR CONTACT SECTION --- */}
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Sold by</p>
          <span className="font-bold text-[#00529b] text-lg">{vendorName}</span>
        </div>

        <div className="relative group z-20">
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-50 transition-colors">
            <MessageCircle size={18} className="text-[#00529b]" />
            Contact Vendor
          </button>
          <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2">
             <a href={`https://wa.me/${String(vendorPhone).replace(/\D/g,'')}?text=Hi`} target="_blank" className="flex items-center gap-3 px-3 py-3 hover:bg-green-50 text-green-700 rounded-lg">
               <Phone size={20} /> <span className="font-bold text-sm">WhatsApp</span>
             </a>
             <a href={`mailto:${vendorEmail}`} className="flex items-center gap-3 px-3 py-3 hover:bg-blue-50 text-[#00529b] rounded-lg">
               <Mail size={20} /> <span className="font-bold text-sm">Email Inquiry</span>
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}