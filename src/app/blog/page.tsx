import Image from "next/image";
import Link from "next/link";
import { JsonLd, PageHero, PostCard } from "@/components/ui";
import { img, posts } from "@/lib/data";
import { buildMetadata, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "مجله آرکا | راهنمای خرید لوازم کابینت و ایده‌های طراحی آشپزخانه",
  description: "مقالات تخصصی درباره خرید لولا و ریل کابینت، مقایسه های‌گلاس و پلی‌لاک، قیمت کابینت، نگهداری و ترندهای طراحی آشپزخانه.",
  path: "/blog",
  image: img.k4,
});

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <>
      <JsonLd data={itemListLd("مقالات مجله آرکا", posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })))} />
      <PageHero title="مجله آرکا" text="راهنمای خرید، مقایسه متریال، ایده‌های طراحی و نکات نگهداری کابینت؛ نوشته‌شده توسط کارشناسان ما." crumbs={[{ name: "مجله", path: "/blog" }]} image={img.k4} />
      <section className="container-x py-20">
        <Link href={`/blog/${first.slug}`} className="group mb-16 grid overflow-hidden rounded-[32px] bg-white shadow-soft lg:grid-cols-2">
          <div className="relative min-h-[280px]">
            <Image src={first.image} alt={first.title} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="eyebrow">{first.category} · مقاله ویژه</span>
            <h2 className="mt-4 text-2xl font-black leading-[1.5] md:text-3xl">{first.title}</h2>
            <p className="mt-4 leading-8 text-muted">{first.excerpt}</p>
            <p className="mt-6 text-sm text-muted"><time dateTime={first.date}>{first.dateFa}</time> · {first.readTime} مطالعه · {first.author}</p>
          </div>
        </Link>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
        </div>
      </section>
    </>
  );
}
