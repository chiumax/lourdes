import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // The site is one page.
  return [{ url: absoluteUrl("/es") }];
}
