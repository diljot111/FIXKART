import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* =========================
         ALL SEARCH ENGINES
      ========================= */
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          "/api/",
          "/_next/",
          "/_vercel/",
          "/sign-in",
          "/sign-up",
          "/checkout",
          "/cart",
          "/wallet",
          "/profile",
          "/admin",
          "/dashboard",
        ],
      },

      /* =========================
         GOOGLE BOT (ADVANCED CONTROL)
      ========================= */
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/sign-in",
          "/sign-up",
          "/checkout",
          "/cart",
        ],
      },

      /* =========================
         IMAGE BOT (OPTIMIZED)
      ========================= */
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },

      /* =========================
         ADS / CRAWL OPTIMIZATION
      ========================= */
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
    ],

    sitemap: "https://www.thefixkart.com/sitemap.xml",
    host: "https://www.thefixkart.com",
  };
}
