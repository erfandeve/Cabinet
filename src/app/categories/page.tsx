import Link from "next/link";
import { Suspense } from "react";
import { Reveal, Tilt } from "@/components/Interactive";
import ProductArt from "@/components/ProductArt";
import ProductBrowser from "@/components/ProductBrowser";
import { CtaBand, JsonLd, PageHero, SectionHead } from "@/components/ui";
import { categories, img, products, productsOf } from "@/lib/data";
import { buildMetadata, itemListLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "فروشگاه لوازم و یراق‌آلات کابینت | خرید لولا، ریل، جک و دستگیره",
  description: "خرید آنلاین لوازم کابینت شامل لولا آرام‌بند، ریل تاندم، جک درب بالا، دستگیره، سبد سوپری، صفحه و ورق کابینت از برندهای Blum، Hettich و Grass با ضمانت اصالت و ارسال سراسری.",
  path: "/categories",
  image: img.k3,
});

export default function CategoriesPage() {
  return (
    <>
      <JsonLd data={itemListLd("دسته‌بندی لوازم کابینت", categories.map((c) => ({ name: c.name, path: `/categories/${c.slug}` })))} />
      <PageHero title="فروشگاه لوازم و یراق‌آلات کابینت" text="بیش از ۳۴۰۰ کالای اصل از برندهای معتبر اروپایی و ترک؛ با قیمت عمده برای کابینت‌سازان و ارسال سریع به سراسر ایران." crumbs={[{ name: "فروشگاه لوازم", path: "/categories" }]} image={img.k3} />
      <section className="container-x py-20">
        <SectionHead eyebrow="دسته‌بندی‌ها" title="دسته مورد نظرتان را انتخاب کنید" />
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 60}>
              <Tilt className="group h-full rounded-[24px] bg-white shadow-soft">
                <Link href={`/categories/${c.slug}`} className="flex h-full items-center gap-4 p-4">
                  <span className="pop relative grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sand to-cream">
                    <ProductArt kind={c.icon} hue={c.hue} className="size-16" />
                  </span>
                  <span>
                    <span className="block font-black">{c.name}</span>
                    <span className="mt-1 block text-xs text-muted">{productsOf(c.slug).length.toLocaleString("fa-IR")} محصول</span>
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container-x pb-12">
        <SectionHead eyebrow="همه محصولات" title="خرید آنلاین یراق‌آلات کابینت" />
        <Suspense fallback={null}>
          <ProductBrowser items={products} />
        </Suspense>
      </section>
      <CtaBand />
    </>
  );
}
