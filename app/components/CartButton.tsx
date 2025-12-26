"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./../context/CartContext";

export default function CartButton() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2">
        <ShoppingCart size={24} className="text-white opacity-50" />
      </div>
    );
  }

  return (
    <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors group">
      <ShoppingCart size={24} className="text-white group-hover:scale-110 transition-transform" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#ffc20e] text-[#00529b] text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md animate-in zoom-in">
          {cartCount}
        </span>
      )}
    </Link>
  );
}