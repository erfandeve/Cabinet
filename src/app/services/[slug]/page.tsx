import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Interactive";
import { CtaBand, JsonLd, PageHero, ProjectCard, SectionHead, ServiceCard } from "@/components/ui";
import { getService, projects, services } from "@/lib/data";
import { buildMetadata, serviceLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: `${s.title} در تهران | قیمت و مشاوره رایگان`, description: s.description.slice(0, 158), path: `/services/${s.slug}`, keywords: [s.title, `قیمت ${s.title}`, `${s.title} تهران`, "کابینت آشپزخانه"] });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={serviceLd(s)} />
      <PageHero title={s.title} text={s.short} crumbs={[{ name: "خدمات", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }]} image={projects[0].image} />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="text-2xl font-black md:text-3xl">درباره این خدمت</h2>
          <p className="mt-5 text-lg leading-9 text-ink/75">{s.description}</p>
          <h2 className="mt-12 text-2xl font-black">ویژگی‌ها</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.features.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-2xl bg-white p-5 font-medium shadow-soft">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage text-cream"><Icon name="check" className="size-4" strokeWidth={2.5} /></span>{f}
              </li>
            ))}
          </ul>
          <h2 className="mt-12 text-2xl font-black">مراحل اجرا</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-4">
            {s.steps.map((st, i) => (
              <Reveal as="li" key={st} delay={i * 80}>
                <div className="rounded-2xl border border-ink/10 p-5 text-center">
                  <span className="mx-auto grid size-10 place-items-center rounded-full bg-brass font-black text-coal">{(i + 1).toLocaleString("fa-IR")}</span>
                  <p className="mt-3 text-sm font-bold">{st}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <aside>
          <div className="sticky top-28 rounded-[28px] bg-coal p-8 text-white shadow-deep">
            <span className="grid size-14 place-items-center rounded-2xl bg-brass text-coal"><Icon name={s.icon} className="size-7" /></span>
            <p className="mt-6 text-sm text-white/55">شروع قیمت</p>
            <p className="mt-1 text-2xl font-black text-brass-light">{s.priceFrom}</p>
            <Link href="/contact" className="mt-8 flex h-14 items-center justify-center rounded-full bg-brass font-bold text-coal transition hover:bg-brass-light">درخواست مشاوره رایگان</Link>
            <p className="mt-4 text-center text-xs text-white/50">پاسخگویی در کمتر از ۲ ساعت کاری</p>
          </div>
        </aside>
      </section>
      <section className="bg-sand/60 py-20">
        <div className="container-x">
          <SectionHead eyebrow="نمونه کار" title="پروژه‌های مرتبط" action={{ href: "/gallery", label: "گالری کامل" }} />
          <div className="grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>
      <section className="container-x py-20">
        <SectionHead eyebrow="سایر خدمات" title="شاید این خدمات هم برایتان مفید باشد" />
        <div className="grid gap-5 md:grid-cols-3">{others.map((o, i) => <ServiceCard key={o.slug} s={o} i={i} />)}</div>
      </section>
      <CtaBand />
    </>
  );
}
