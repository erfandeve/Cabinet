import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { JsonLd } from "@/components/ui";
import { organizationLd, websiteLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap", variable: "--font-vazir", weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | فروش لوازم و یراق‌آلات کابینت، طراحی و ساخت کابینت`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Home Improvement",
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: "/", languages: { "fa-IR": "/" } },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: site.name,
    url: site.url,
    title: `${site.name} | لوازم کابینت و طراحی سه‌بعدی آشپزخانه`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: { "geo.region": "IR-07", "geo.placename": "Tehran", "geo.position": `${site.geo.lat};${site.geo.lng}`, ICBM: `${site.geo.lat}, ${site.geo.lng}` },
};

export const viewport: Viewport = {
  themeColor: "#12100e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      </head>
      <body className="min-h-dvh font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:font-bold">
          پرش به محتوای اصلی
        </a>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
