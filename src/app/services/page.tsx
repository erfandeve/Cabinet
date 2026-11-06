import { CtaBand, Faq, JsonLd, PageHero, SectionHead, ServiceCard } from "@/components/ui";
import { faqs, img, services } from "@/lib/data";
import { buildMetadata, faqLd, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "خدمات طراحی، ساخت و نصب کابینت آشپزخانه در تهران",
  description: "طراحی سه‌بعدی کابینت، ساخت و نصب کابینت آشپزخانه، کمد دیواری، کابینت روشویی و بازسازی کابینت در تهران و کرج با متره و مشاوره رایگان و ۵ سال ضمانت.",
  path: "/services",
  image: img.k1,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[itemListLd("خدمات آرکا کابینت", services.map((s) => ({ name: s.title, path: `/services/${s.slug}` }))), faqLd(faqs.slice(0, 4))]} />
      <PageHero title="خدمات طراحی و ساخت کابینت" text="از مشاوره و متره رایگان تا طراحی سه‌بعدی، تولید با CNC و نصب؛ همه مراحل زیر یک سقف و با یک قرارداد شفاف." crumbs={[{ name: "خدمات", path: "/services" }]} image={img.k1} />
      <section className="container-x py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
        </div>
      </section>
      <section className="container-x pb-10">
        <SectionHead eyebrow="سؤالات متداول" title="درباره خدمات ما بیشتر بدانید" />
        <Faq items={faqs.slice(0, 4)} />
      </section>
      <CtaBand />
    </>
  );
}
