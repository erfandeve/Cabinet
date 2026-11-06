import GalleryGrid from "@/components/GalleryGrid";
import { CtaBand, JsonLd, PageHero } from "@/components/ui";
import { img, projects } from "@/lib/data";
import { buildMetadata, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "گالری نمونه کار کابینت آشپزخانه | های‌گلاس، پلی‌لاک، ممبران",
  description: "نمونه کارهای اجراشده کابینت آشپزخانه، کمد دیواری و روشویی توسط آرکا کابینت در تهران و کرج؛ مدرن، کلاسیک، مینیمال و اسکاندیناوی با جزئیات متریال و یراق.",
  path: "/gallery",
  image: img.k6,
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={itemListLd("نمونه کارهای آرکا کابینت", projects.map((p) => ({ name: p.title, path: `/gallery/${p.slug}` })))} />
      <PageHero title="گالری نمونه کارها" text="بیش از ۱۲۵۰ پروژه اجراشده؛ گوشه‌ای از آشپزخانه‌هایی که با عشق و دقت طراحی و ساخته‌ایم." crumbs={[{ name: "نمونه کارها", path: "/gallery" }]} image={img.k6} />
      <section className="container-x py-20">
        <GalleryGrid items={projects} />
      </section>
      <CtaBand />
    </>
  );
}
