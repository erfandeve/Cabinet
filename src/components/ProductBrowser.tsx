"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, type Product } from "@/lib/data";
import Icon from "./Icon";
import { ProductCard } from "./ui";

type Sort = "popular" | "cheap" | "expensive" | "discount";

export default function ProductBrowser({ items, showCategoryFilter = true }: { items: Product[]; showCategoryFilter?: boolean }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("popular");
  const [stock, setStock] = useState(false);

  const list = useMemo(() => {
    const term = q.trim();
    let r = items.filter((p) => (cat === "all" || p.category === cat) && (!stock || p.inStock) && (!term || p.name.includes(term) || p.brand.toLowerCase().includes(term.toLowerCase())));
    r = [...r].sort((a, b) => {
      if (sort === "cheap") return a.price - b.price;
      if (sort === "expensive") return b.price - a.price;
      if (sort === "discount") return (b.oldPrice ? 1 - b.price / b.oldPrice : 0) - (a.oldPrice ? 1 - a.price / a.oldPrice : 0);
      return b.reviews - a.reviews;
    });
    return r;
  }, [items, q, cat, sort, stock]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 rounded-[22px] bg-white p-3 shadow-soft md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">جستجو در محصولات</span>
          <Icon name="search" className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="جستجوی لولا، ریل، دستگیره یا برند…" className="h-12 w-full rounded-2xl bg-cream pr-12 pl-4 text-sm outline-none ring-brass/40 focus:ring-2" />
        </label>
        <div className="flex flex-wrap gap-2">
          {showCategoryFilter && (
            <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="دسته‌بندی" className="h-12 rounded-2xl bg-cream px-4 text-sm outline-none ring-brass/40 focus:ring-2">
              <option value="all">همه دسته‌ها</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          )}
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="مرتب‌سازی" className="h-12 rounded-2xl bg-cream px-4 text-sm outline-none ring-brass/40 focus:ring-2">
            <option value="popular">محبوب‌ترین</option>
            <option value="cheap">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
            <option value="discount">بیشترین تخفیف</option>
          </select>
          <label className="flex h-12 cursor-pointer items-center gap-2 rounded-2xl bg-cream px-4 text-sm">
            <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} className="size-4 accent-[#c39b5f]" />
            فقط موجود
          </label>
        </div>
      </div>
      <p className="mb-5 text-sm text-muted" aria-live="polite">{list.length.toLocaleString("fa-IR")} محصول</p>
      {list.length ? (
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
        </div>
      ) : (
        <div className="rounded-[22px] border border-dashed border-ink/15 py-16 text-center text-muted">محصولی با این مشخصات پیدا نشد. با ما تماس بگیرید تا برایتان تأمین کنیم.</div>
      )}
    </div>
  );
}
