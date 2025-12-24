import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

/* Force dynamic rendering */
export const dynamic = "force-dynamic";

/* =========================
   🔥 PRODUCT PAGE SEO
========================= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return {
      title: "Product Not Found | FixKart",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} | Industrial Fasteners Supplier in India – FixKart`,
    description: `Buy ${product.title} from FixKart. Trusted industrial fasteners supplier in India offering premium quality products, competitive pricing, and fast nationwide delivery.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${product.slug}`,
    },
  };
}

/* =========================
   PRODUCT PAGE
========================= */
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return notFound();
  }

  const specs = (product.specs as Record<string, string>) || {};

  /* Contact config */
  const VENDOR_PHONE = "918699466669";
  const message = encodeURIComponent(
    `Hello, I am interested in buying: ${product.title}\nPrice: ₹${product.price}\nLink: ${process.env.NEXT_PUBLIC_BASE_URL}/product/${slug}`
  );
  const whatsappUrl = `https://wa.me/${VENDOR_PHONE}?text=${message}`;
  const emailUrl = `mailto:info@thefixkart.com?subject=Inquiry: ${product.title}`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      {/* =========================
          🔥 PRODUCT SCHEMA (JSON-LD)
      ========================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image,
            description: product.description,
            sku: product.sku,
            brand: {
              "@type": "Brand",
              name: product.brand || "FixKart",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability:
                product.quantity > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${product.slug}`,
            },
          }),
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* =========================
            BREADCRUMBS (SEO)
        ========================= */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#00529b] hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/browse/${product.subCategory}`}
            className="hover:text-[#00529b] hover:underline capitalize"
          >
            {product.subCategory}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-800 line-clamp-1">
            {product.title}
          </span>
        </nav>

        {/* =========================
            MAIN PRODUCT CARD
        ========================= */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* IMAGE */}
          <div className="w-full md:w-1/2 bg-gray-50 p-8 flex justify-center border-r">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={product.image || "https://placehold.co/600?text=No+Image"}
                alt={`${product.title} – Industrial fasteners supplier in India`}
                fill
                className="object-contain p-4"
                unoptimized
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase">
              {product.subSubCategory || product.subCategory}
            </span>

            {/* 🔥 H1 */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#00529b] mt-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-6 pb-6 border-b">
              <div className="text-3xl font-bold text-gray-900">
                ₹{product.price.toFixed(2)}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  product.quantity > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase mb-2">
                Product Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description ||
                  "High-quality industrial fastener supplied by FixKart for heavy-duty applications."}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00529b] text-white font-bold py-4 rounded-lg text-center"
              >
                Contact Vendor on WhatsApp
              </a>

              <a
                href={emailUrl}
                className="border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-lg text-center"
              >
                Email Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
