import React, { Suspense } from "react";
import type { Metadata } from "next";
import InventoryContent from "@/components/InventoryContent";

/* =========================
   PAGE LEVEL SEO METADATA
   (SEO WORKS FROM HEAD)
========================= */
export const metadata: Metadata = {
  title: "Industrial Fasteners Supplier in India | Nuts & Bolts Online",
  description:
    "FixKart is a trusted industrial fasteners supplier in India. Buy nuts, bolts, stainless steel fasteners, high tensile bolts, and industrial hardware online with fast nationwide delivery.",
};

/* =========================
   HOME PAGE (NO SEO TEXT IN UI)
========================= */
export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header Spacer (for fixed header) */}
      <div className="w-full h-[70px]" />

      {/* ONLY REAL CONTENT SHOWN TO USERS */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00529b]" />
          </div>
        }
      >
        <InventoryContent />
      </Suspense>
    </div>
  );
}
