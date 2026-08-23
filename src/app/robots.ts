import type { MetadataRoute } from "next";

const BASE_URL = "https://www.joinsoccercubs.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/billing"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
