import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the selected Spanish page is public; aliases and studies are excluded.
  return [{ url: absoluteUrl("/es") }];
}
