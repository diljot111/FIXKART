"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

/* ---------------- TYPES ---------------- */
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

/* ---------------- MOCK DB ---------------- */
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
      "Buy premium quality industrial fasteners online from TheFixKart. Trusted supplier for bolts, screws & hardware.",
    image: "https://placehold.co/400x400/f3f4f6/00529b.png?text=Product",
    variants: [
      { id: "d1", size: "Standard Size A", material: "Steel", price: 100, stock: 50 },
      { id: "d2", size: "Standard Size B", material: "Alloy", price: 150, stock: 25 },
    ],
  },
};

/* ---------------- MAIN PAGE ---------------- */
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

  const seoTitle =
    product?.title?.length > 0
      ? `${product.title} | Buy Online at TheFixKart`
      : "Industrial Fasteners Online | TheFixKart";

  const seoDescription =
    product?.description ||
    "Buy premium quality industrial fasteners online at TheFixKart.";

  const canonicalUrl = `${siteDomain}/${category}/${item}`;

  const prices = product.variants.map((v) => v.price);
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: seoDescription,
    image: product.image.startsWith("http")
      ? product.image
      : `${siteDomain}${product.image}`,
    brand: {
      "@type": "Brand",
      name: "TheFixKart",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice,
      highPrice,
      offerCount: product.variants.length,
      availability: product.variants.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteDomain },
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
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large"
        />

        <link rel="canonical" href={canonicalUrl} />

        <meta
          name="keywords"
          content={`${product.title}, industrial fasteners, bolts supplier, screws online, hardware store, TheFixKart`}
        />

        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TheFixKart" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content={
            product.image.startsWith("http")
              ? product.image
              : `${siteDomain}${product.image}`
          }
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta
          name="twitter:image"
          content={
            product.image.startsWith("http")
              ? product.image
              : `${siteDomain}${product.image}`
          }
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      {/* ================= PAGE CONTENT ================= */}
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
        {/* Breadcrumb UI */}
        <div className="max-w-6xl mx-auto mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00529b] hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{category.replace(/-/g, " ")}</span>
          <span className="mx-2">/</span>
          <span className="font-bold text-gray-800">{product.title}</span>
        </div>

        {/* Product Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border">
          <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8 border-b">
            <div className="w-full md:w-1/3 flex justify-center bg-gray-50 rounded-lg p-4">
              <div className="relative w-64 h-64">
                <Image
                  src={product.image}
                  alt={`${product.title} industrial fastener`}
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

          {/* Variants table remains unchanged */}
        </div>
      </div>
    </>
  );
}
