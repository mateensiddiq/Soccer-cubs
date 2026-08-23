import type { MetadataRoute } from "next";
import { getPublicLocations } from "@/lib/locations";

const BASE_URL = "https://www.joinsoccercubs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locations = await getPublicLocations();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/program`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/signup`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${BASE_URL}/signup/${location.id}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...locationRoutes];
}
