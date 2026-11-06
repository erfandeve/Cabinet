import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import Icon from "@/components/Icon";
import ProductArt from "@/components/ProductArt";
import { Breadcrumbs, JsonLd, ProductCard, SectionHead } from "@/components/ui";
import { discount, getCategory, getProduct, products, productsOf, toman } from "@/lib/data";
import { buildMetadata, productLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: `خرید ${p.name} ${p.brand} | قیمت روز`,
    description: `${p.summary} قیمت: ${toman(p.price)}. ضمانت اصالت و ارسال سریع از آرکا کابینت.`,
    path: `/products/${p.slug}`,
    keywords: [p.name, `خرید ${p.name}`, `قیمت ${p.name}`, p.brand, "لوازم کابینت"],
  });
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = getCategory(p.category)!;
  const off = discount(p);
  const related = productsOf(c.slug).filter((x) => x.slug !== p.slug).concat(products.filter((x) => x.category !== c.slug)).slice(0, 4);
  return (
    <>
      <JsonLd data={productLd(p)} />
      <div className="container-x pt-28 md:pt-32">
        <Breadcrumbs items={[{ name: "فروشگاه لوازم", path: "/categories" }, { name: c.name, path: `/categories/${c.slug}` }, { name: p.name, path: `/products/${p.slug}` }]} />
      </div>
      <article className="container-x grid gap-10 py-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative" style={{ perspective: 1200 }}>
          <div className="grain sticky top-28 overflow-hidden rounded-[32px] bg-gradient-to-br from-sand via-cream to-white shadow-deep [transform:rotateY(6deg)_rotateX(3deg)]">
            <div className="absolute inset-x-12 bottom-10 h-10 rounded-[50%] bg-ink/15 blur-xl" />
            <ProductArt kind={c.icon} hue={c.hue} className="floaty relative mx-auto aspect-square w-[85%]" />
            {off > 0 && <span className="absolute right-6 top-6 rounded-full bg-brass px-4 py-1.5 text-sm font-black text-coal">٪{off.toLocaleString("fa-IR")} تخفیف</span>}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-oak">{p.brand} · {c.name}</p>
          <h1 className="mt-3 text-3xl font-black leading-[1.4] md:text-4xl">{p.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span className="flex items-center gap-1 text-brass"><Icon name="star" className="size-4" /><b className="text-ink">{p.rating.toLocaleString("fa-IR")}</b></span>
            <span>({p.reviews.toLocaleString("fa-IR")} نظر)</span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${p.inStock ? "bg-sage/15 text-sage" : "bg-ink/10 text-muted"}`}>{p.inStock ? "موجود در انبار" : "ناموجود"}</span>
          </div>
          <p className="mt-6 leading-8 text-ink/75">{p.summary}</p>
          <div className="mt-8 rounded-[24px] bg-white p-6 shadow-soft">
            {p.oldPrice && <del className="text-sm text-muted">{toman(p.oldPrice)}</del>}
            <p className="text-3xl font-black">{toman(p.price)}</p>
            <BuyBox inStock={p.inStock} name={p.name} />
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            {[["shield", "ضمانت اصالت"], ["truck", "ارسال سریع"], ["refresh", "۷ روز بازگشت"]].map(([i, t]) => (
              <li key={t} className="rounded-2xl bg-sand/70 p-4"><Icon name={i} className="mx-auto mb-2 size-6 text-oak" />{t}</li>
            ))}
          </ul>
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-black">مشخصات فنی</h2>
            <table className="w-full overflow-hidden rounded-2xl bg-white text-sm shadow-soft">
              <tbody>
                <tr className="border-b border-ink/5"><th className="w-2/5 bg-sand/40 p-4 text-right font-medium text-muted">برند</th><td className="p-4 font-bold">{p.brand}</td></tr>
                {p.specs.map(([k, v]) => (
                  <tr key={k} className="border-b border-ink/5 last:border-0"><th className="bg-sand/40 p-4 text-right font-medium text-muted">{k}</th><td className="p-4 font-bold">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </article>
      <section className="container-x py-16">
        <SectionHead eyebrow="پیشنهاد ما" title="محصولات مرتبط" />
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {related.map((r, i) => <ProductCard key={r.slug} p={r} i={i} />)}
        </div>
      </section>
    </>
  );
}
