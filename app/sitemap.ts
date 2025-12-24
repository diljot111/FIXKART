import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thefixkart.com";
  const now = new Date();

  return [
    /* =====================
       CORE PAGES (HIGH PRIORITY)
    ====================== */
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/bulk-order`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/find-branch`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    /* =====================
       USER / TRANSACTION PAGES
    ====================== */
    {
      url: `${baseUrl}/sign-in`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },

    /* =====================
       FUTURE SEO EXPANSION
       (Enable when pages exist)
    ====================== */
    {
      url: `${baseUrl}/industrial-fasteners`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nuts-and-bolts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stainless-steel-fasteners`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
