import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, JsonLd, PostCard } from "@/components/ui";
import { categories, getPost, posts } from "@/lib/data";
import { articleLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, image: p.image, type: "article", publishedTime: p.date });
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={articleLd(p)} />
      <article>
        <header className="container-x max-w-4xl pt-28 md:pt-36">
          <Breadcrumbs items={[{ name: "مجله", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]} />
          <span className="eyebrow mt-8">{p.category}</span>
          <h1 className="mt-4 text-balance text-3xl font-black leading-[1.45] md:text-5xl">{p.title}</h1>
          <p className="mt-5 text-lg leading-9 text-muted">{p.excerpt}</p>
          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <span>نویسنده: <b className="text-ink">{p.author}</b></span>
            <time dateTime={p.date}>{p.dateFa}</time>
            <span>{p.readTime} مطالعه</span>
          </p>
        </header>
        <div className="container-x my-10 max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[32px] shadow-deep">
            <Image src={p.image} alt={p.title} fill priority sizes="(min-width:1024px) 1000px, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="container-x grid max-w-5xl gap-12 pb-16 lg:grid-cols-[1fr_260px]">
          <div className="prose-fa">
            {p.body.map((b) => (
              <section key={b.h}>
                <h2 id={b.h.replace(/\s+/g, "-")}>{b.h}</h2>
                {b.p.map((t) => <p key={t}>{t}</p>)}
              </section>
            ))}
          </div>
          <aside className="space-y-6">
            <nav aria-label="فهرست مطالب" className="rounded-[22px] bg-white p-6 shadow-soft lg:sticky lg:top-28">
              <p className="mb-3 text-sm font-black">فهرست مطالب</p>
              <ol className="space-y-2 text-sm text-muted">
                {p.body.map((b) => <li key={b.h}><a href={`#${b.h.replace(/\s+/g, "-")}`} className="hover:text-oak">{b.h}</a></li>)}
              </ol>
              <p className="mb-3 mt-6 text-sm font-black">خرید لوازم کابینت</p>
              <ul className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map((c) => <li key={c.slug}><Link href={`/categories/${c.slug}`} className="block rounded-full bg-sand px-3 py-1.5 text-xs hover:bg-brass">{c.name}</Link></li>)}
              </ul>
            </nav>
          </aside>
        </div>
      </article>
      <section className="bg-sand/60 py-20">
        <div className="container-x">
          <h2 className="mb-10 text-2xl font-black md:text-3xl">مقالات پیشنهادی</h2>
          <div className="grid gap-10 md:grid-cols-3">{more.map((m, i) => <PostCard key={m.slug} p={m} i={i} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
