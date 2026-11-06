import type { Metadata } from "next";
import { absUrl, site } from "./site";
import type { Post, Product, Project, Service } from "./data";
import { getCategory } from "./data";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  publishedTime?: string;
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, image, type = "website", keywords, publishedTime, noindex }: MetaInput): Metadata {
  const url = absUrl(path);
  const images = image ? [{ url: image.startsWith("http") ? `${image}?w=1200&h=630&fit=crop&q=80` : absUrl(image), width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    keywords: keywords ?? site.keywords,
    alternates: { canonical: url, languages: { "fa-IR": url } },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "fa_IR",
      ...(images ? { images } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

// ---------- JSON-LD ----------
export const orgId = `${site.url}/#organization`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "Store"],
    "@id": orgId,
    name: site.name,
    alternateName: site.nameEn,
    url: site.url,
    logo: absUrl("/icon.svg"),
    image: absUrl("/opengraph-image"),
    description: site.description,
    telephone: site.phoneHref,
    email: site.email,
    foundingDate: "2013",
    priceRange: "$$",
    currenciesAccepted: "IRR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [{ "@type": "City", name: "تهران" }, { "@type": "City", name: "کرج" }, { "@type": "Country", name: "ایران" }],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"], opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "14:00" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1250", bestRating: "5" },
    sameAs: Object.values(site.social),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "fa-IR",
    publisher: { "@id": orgId },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/categories?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function productLd(p: Product) {
  const cat = getCategory(p.category);
  const priceRial = p.price * 10;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    sku: p.slug,
    category: cat?.name,
    brand: { "@type": "Brand", name: p.brand },
    image: absUrl("/opengraph-image"),
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews, bestRating: 5 },
    offers: {
      "@type": "Offer",
      url: absUrl(`/products/${p.slug}`),
      priceCurrency: "IRR",
      price: priceRial,
      priceValidUntil: "2027-03-20",
      itemCondition: "https://schema.org/NewCondition",
      availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@id": orgId },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "IR" },
      },
    },
  };
}

export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absUrl(it.path) })),
  };
}

export function serviceLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    serviceType: s.title,
    provider: { "@id": orgId },
    areaServed: [{ "@type": "City", name: "تهران" }, { "@type": "City", name: "کرج" }],
    url: absUrl(`/services/${s.slug}`),
  };
}

export function articleLd(p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    image: [p.image + "?w=1200&h=630&fit=crop"],
    datePublished: p.date,
    dateModified: p.date,
    inLanguage: "fa-IR",
    author: { "@type": "Person", name: p.author },
    publisher: { "@id": orgId },
    mainEntityOfPage: absUrl(`/blog/${p.slug}`),
    articleSection: p.category,
  };
}

export function projectLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    image: p.gallery.map((g) => `${g}?w=1200&fit=crop`),
    creator: { "@id": orgId },
    locationCreated: { "@type": "Place", name: p.location },
    keywords: p.tags.join("، "),
    url: absUrl(`/gallery/${p.slug}`),
  };
}
