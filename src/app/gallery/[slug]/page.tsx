import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tilt } from "@/components/Interactive";
import { Breadcrumbs, CtaBand, JsonLd, ProjectCard, SectionHead } from "@/components/ui";
import { getProject, projects } from "@/lib/data";
import { buildMetadata, projectLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.title} | نمونه کار کابینت ${p.style}`, description: `${p.summary} متریال: ${p.material}. متراژ ${p.area}، ${p.location}.`, path: `/gallery/${p.slug}`, image: p.image, keywords: [...p.tags, `کابینت ${p.style}`, "نمونه کار کابینت"] });
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const more = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  const facts = [["موقعیت", p.location], ["سال اجرا", p.year], ["متراژ", p.area], ["متریال", p.material], ["سبک", p.style]];
  return (
    <>
      <JsonLd data={projectLd(p)} />
      <section className="relative h-[78svh] min-h-[520px] overflow-hidden bg-coal">
        <Image src={p.image} alt={`${p.title} - ${p.material}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-coal/50" />
        <div className="container-x relative flex h-full flex-col justify-end pb-14">
          <Breadcrumbs light items={[{ name: "نمونه کارها", path: "/gallery" }, { name: p.title, path: `/gallery/${p.slug}` }]} />
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.3] text-white md:text-6xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">{p.summary}</p>
        </div>
      </section>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_2fr]">
        <aside>
          <dl className="sticky top-28 divide-y divide-ink/10 rounded-[24px] bg-white p-6 shadow-soft">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3.5 text-sm"><dt className="text-muted">{k}</dt><dd className="text-left font-bold">{v}</dd></div>
            ))}
            <div className="pt-5"><Link href="/contact" className="flex h-12 items-center justify-center rounded-full bg-ink text-sm font-bold text-cream transition hover:bg-walnut">مشابه این را می‌خواهم</Link></div>
          </dl>
        </aside>
        <div className="grid gap-5">
          {p.gallery.map((g, i) => (
            <Tilt key={g + i} max={3} className="overflow-hidden rounded-[28px] shadow-deep">
              <div className="relative aspect-[16/10]">
                <Image src={g} alt={`${p.title} - تصویر ${(i + 1).toLocaleString("fa-IR")}`} fill sizes="(min-width:1024px) 66vw, 100vw" className="object-cover" />
              </div>
            </Tilt>
          ))}
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => <span key={t} className="rounded-full bg-sand px-4 py-2 text-sm font-medium">#{t}</span>)}
          </div>
        </div>
      </section>
      <section className="bg-sand/60 py-20">
        <div className="container-x">
          <SectionHead eyebrow="پروژه‌های دیگر" title="نمونه کارهای بیشتر" action={{ href: "/gallery", label: "گالری کامل" }} />
          <div className="grid gap-5 md:grid-cols-3">{more.map((m, i) => <ProjectCard key={m.slug} p={m} i={i} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
