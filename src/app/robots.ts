import type { MetadataRoute } from "next";
import { absUrl, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absUrl("/sitemap.xml"),
    host: site.url,
  };
}
