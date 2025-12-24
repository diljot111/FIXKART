"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// --- TYPE DEFINITIONS ---
type Variant = {
  id: string;
  size: string;
  material: string;
  price: number;
  stock: number;
};

type ProductDetails = {
  title: string;
  description: string;
  image: string;
  variants: Variant[];
};

// --- MOCK DATABASE ---
const MOCK_DB: Record<string, ProductDetails> = {
  bolts: {
    title: "Industrial Hex Bolts",
    description:
      "High-strength industrial hex bolts suitable for construction, machinery, and heavy-duty applications.",
    image: "/fastening/bolts.webp",
    variants: [
      { id: "b1", size: "M6 x 20mm", material: "Stainless Steel", price: 15, stock: 100 },
      { id: "b2", size: "M6 x 40mm", material: "Stainless Steel", price: 18, stock: 50 },
      { id: "b3", size: "M8 x 30mm", material: "Zinc Plated", price: 25, stock: 0 },
      { id: "b4", size: "M10 x 50mm", material: "High Tensile Steel", price: 45, stock: 200 },
    ],
  },
  screws: {
    title: "General Purpose Screws",
    description:
      "Durable general-purpose screws for wood, metal, and industrial applications.",
    image: "/fastening/screws.jpg",
    variants: [
      { id: "s1", size: "#8 x 1 inch", material: "Brass", price: 5, stock: 500 },
      { id: "s2", size: "#10 x 2 inch", material: "Steel", price: 8, stock: 300 },
    ],
  },
  default: {
    title: "Industrial Fasteners",
    description:
      "High-quality industrial fasteners designed for strength, reliability, and long service life.",
    image: "https://placehold.co/400x400/f3f4f6/00529b.png?text=Product",
    variants: [
      { id: "d1", size: "Standard Size A", material: "Steel", price: 100, stock: 50 },
      { id: "d2", size: "Standard Size B", material: "Alloy", price: 150, stock: 25 },
    ],
  },
};

// --- MAIN PAGE ---
export default function ProductListingPage({
  params,
}: {
  params: Promise<{ category: string; item: string }>;
}) {
  const { category, item } = use(params);
  const itemSlug = item.toLowerCase();

  const product =
    MOCK_DB[itemSlug] || {
      ...MOCK_DB.default,
      title: item.replace(/-/g, " ").toUpperCase(),
    };

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (variantId: string, val: string) => {
    const value = Math.max(0, parseInt(val) || 0);
    setQuantities((prev) => ({ ...prev, [variantId]: value }));
  };

  const addToCart = (variant: Variant) => {
    const qty = quantities[variant.id] || 0;
    if (qty > 0) {
      alert(`Added ${qty} x ${variant.size} to cart!`);
    } else {
      alert("Please select a quantity first.");
    }
  };

  /* ---------------- SEO DATA ---------------- */
  const siteDomain = "https://www.thefixkart.com";
  const pageTitle = `${product.title} | TheFixKart`;
  const pageDescription = product.description;
  const canonicalUrl = `${siteDomain}/${category}/${item}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image.startsWith("http")
      ? product.image
      : `${siteDomain}${product.image}`,
    brand: {
      "@type": "Brand",
      name: "TheFixKart",
    },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      priceCurrency: "INR",
      price: v.price,
      availability:
        v.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: canonicalUrl,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteDomain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.replace(/-/g, " "),
        item: `${siteDomain}/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      {/* ================= SEO HEAD ================= */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${product.title}, TheFixKart, industrial fasteners, hardware online, bolts, screws`}
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={
            product.image.startsWith("http")
              ? product.image
              : `${siteDomain}${product.image}`
          }
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content={
            product.image.startsWith("http")
              ? product.image
              : `${siteDomain}${product.image}`
          }
        />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      {/* ================= PAGE CONTENT (UNCHANGED) ================= */}
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00529b] hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{category.replace(/-/g, " ")}</span>
          <span className="mx-2">/</span>
          <span className="font-bold text-gray-800 capitalize">
            {product.title}
          </span>
        </div>

        {/* Product Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border">
          {/* Header */}
          <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8 border-b">
            <div className="w-full md:w-1/3 flex justify-center bg-gray-50 rounded-lg p-4">
              <div className="relative w-64 h-64">
                <Image
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : product.image
                  }
                  alt={`${product.title} product image`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold text-[#00529b] mb-2">
                {product.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>
              <div className="bg-blue-50 text-[#00529b] px-4 py-2 rounded-md inline-block text-sm font-semibold">
                In Stock & Ready to Ship
              </div>
            </div>
          </div>

          {/* Variants Table Section (unchanged) */}
          {/* Your existing table code goes here */}
        </div>
      </div>
    </>
  );
}
