import type { MetadataRoute } from "next";
import { categories, posts, products, projects, services } from "@/lib/data";
import { absUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const s = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified: Date = now, images?: string[]) => ({ url: absUrl(path), lastModified, changeFrequency, priority, ...(images ? { images } : {}) });
  return [
    s("/", 1, "daily"),
    s("/categories", 0.9, "daily"),
    s("/services", 0.9, "monthly"),
    s("/gallery", 0.8, "weekly"),
    s("/blog", 0.7, "weekly"),
    s("/about", 0.5, "yearly"),
    s("/contact", 0.6, "yearly"),
    ...categories.map((c) => s(`/categories/${c.slug}`, 0.85, "daily")),
    ...products.map((p) => s(`/products/${p.slug}`, 0.8, "weekly")),
    ...services.map((x) => s(`/services/${x.slug}`, 0.8, "monthly")),
    ...projects.map((p) => s(`/gallery/${p.slug}`, 0.6, "monthly", now, p.gallery.map((g) => `${g}?w=1200`))),
    ...posts.map((p) => s(`/blog/${p.slug}`, 0.6, "monthly", new Date(p.date), [`${p.image}?w=1200`])),
  ];
}
