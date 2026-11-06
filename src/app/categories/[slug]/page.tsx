import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductArt from "@/components/ProductArt";
import ProductBrowser from "@/components/ProductBrowser";
import { Breadcrumbs, CtaBand, Faq, JsonLd } from "@/components/ui";
import { categories, getCategory, productsOf, toman } from "@/lib/data";
import { buildMetadata, faqLd, itemListLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return buildMetadata({
    title: `خرید ${c.name} | قیمت ${c.name} اصل با ضمانت`,
    description: `${c.description.slice(0, 150)}`,
    path: `/categories/${c.slug}`,
    keywords: [`خرید ${c.name}`, `قیمت ${c.name}`, c.name, "لوازم کابینت", "یراق آلات کابینت"],
  });
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const items = productsOf(c.slug);
  const min = Math.min(...items.map((p) => p.price));
  const faqs = [
    { q: `قیمت ${c.name} از چند شروع می‌شود؟`, a: `قیمت ${c.name} در فروشگاه آرکا از ${toman(min)} شروع می‌شود و برای خرید عمده تخفیف ویژه در نظر گرفته شده است.` },
    { q: `آیا ${c.name} ضمانت دارد؟`, a: "تمام محصولات با ضمانت اصالت و گارانتی برند سازنده عرضه می‌شوند." },
    { q: "ارسال چقدر زمان می‌برد؟", a: "سفارش‌های تهران حداکثر ۲۴ ساعته و شهرستان‌ها ۲ تا ۴ روز کاری تحویل می‌شوند." },
  ];
  return (
    <>
      <JsonLd data={[itemListLd(c.name, items.map((p) => ({ name: p.name, path: `/products/${p.slug}` }))), faqLd(faqs)]} />
      <section className="grain relative overflow-hidden bg-coal pb-16 pt-32 md:pt-40">
        <div className="pointer-events-none absolute -left-20 top-0 size-96 rounded-full blur-3xl" style={{ background: `${c.hue}33` }} />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Breadcrumbs light items={[{ name: "فروشگاه لوازم", path: "/categories" }, { name: c.name, path: `/categories/${c.slug}` }]} />
            <h1 className="mt-6 text-4xl font-black leading-[1.3] text-white md:text-6xl">خرید {c.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{c.description}</p>
            <p className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">شروع قیمت از <strong className="mr-1 text-brass-light">{toman(min)}</strong></p>
          </div>
          <div className="floaty mx-auto w-64 md:w-80" aria-hidden style={{ perspective: 800 }}>
            <div className="rounded-[36px] bg-gradient-to-br from-white/10 to-white/0 p-6 [transform:rotateY(-14deg)_rotateX(8deg)]">
              <ProductArt kind={c.icon} hue={c.hue} className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,.5)]" />
            </div>
          </div>
        </div>
      </section>
      <nav aria-label="سایر دسته‌ها" className="border-b border-ink/5 bg-cream">
        <ul className="container-x flex gap-2 overflow-x-auto py-4">
          {categories.map((x) => (
            <li key={x.slug}>
              <Link href={`/categories/${x.slug}`} aria-current={x.slug === c.slug ? "page" : undefined} className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${x.slug === c.slug ? "bg-ink text-cream" : "bg-sand text-ink/70 hover:bg-ink/10"}`}>{x.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="container-x py-14">
        <Suspense fallback={null}>
          <ProductBrowser items={items} showCategoryFilter={false} />
        </Suspense>
      </section>
      <section className="container-x pb-10">
        <h2 className="mb-6 text-2xl font-black">سؤالات متداول درباره {c.name}</h2>
        <Faq items={faqs} />
      </section>
      <CtaBand />
    </>
  );
}
