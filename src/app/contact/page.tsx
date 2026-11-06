import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { JsonLd, PageHero } from "@/components/ui";
import { img } from "@/lib/data";
import { buildMetadata, orgId } from "@/lib/seo";
import { absUrl, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "تماس با ما | رزرو متره و مشاوره رایگان کابینت",
  description: `تماس با آرکا کابینت برای مشاوره رایگان، متره، سفارش ساخت کابینت و خرید لوازم کابینت. تلفن: ${site.phone}، آدرس: ${site.address.city}، ${site.address.street}.`,
  path: "/contact",
  image: img.k5,
});

const fa = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function ContactPage() {
  const cards = [
    { icon: "phone", t: "تلفن تماس", v: <><a href={`tel:${site.phoneHref}`} dir="ltr" className="block">{fa(site.phone)}</a><a href={`tel:${site.mobileHref}`} dir="ltr" className="block">{fa(site.mobile)}</a></> },
    { icon: "mail", t: "ایمیل", v: <a href={`mailto:${site.email}`}>{site.email}</a> },
    { icon: "pin", t: "دفتر و نمایشگاه", v: <>{site.address.city}، {site.address.street}</> },
    { icon: "clock", t: "ساعات کاری", v: <>{site.hours.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>)}</> },
  ];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: absUrl("/contact"), name: `تماس با ${site.name}`, mainEntity: { "@id": orgId } }} />
      <PageHero title="تماس با ما" text="برای رزرو متره رایگان، سفارش ساخت یا خرید لوازم کابینت با ما در ارتباط باشید. پاسخگویی در کمتر از ۲ ساعت کاری." crumbs={[{ name: "تماس با ما", path: "/contact" }]} image={img.k5} />
      <section className="container-x grid gap-8 py-20 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-4">
          {cards.map((c) => (
            <div key={c.t} className="flex gap-4 rounded-[22px] bg-white p-6 shadow-soft">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand text-oak"><Icon name={c.icon} className="size-6" /></span>
              <div className="text-sm leading-7">
                <p className="font-black">{c.t}</p>
                <div className="text-muted">{c.v}</div>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            {(["whatsapp", "telegram", "instagram"] as const).map((s) => (
              <a key={s} href={site.social[s]} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ink py-4 text-sm font-bold capitalize text-cream transition hover:bg-walnut">
                <Icon name={s} className="size-5" /> {s === "whatsapp" ? "واتساپ" : s === "telegram" ? "تلگرام" : "اینستاگرام"}
              </a>
            ))}
          </div>
        </div>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </section>
      <section className="container-x pb-20">
        <div className="overflow-hidden rounded-[28px] shadow-soft">
          <iframe
            title={`موقعیت ${site.name} روی نقشه`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${site.geo.lng - 0.01}%2C${site.geo.lat - 0.006}%2C${site.geo.lng + 0.01}%2C${site.geo.lat + 0.006}&layer=mapnik&marker=${site.geo.lat}%2C${site.geo.lng}`}
            className="h-[380px] w-full border-0 grayscale-[40%]"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
