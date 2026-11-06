"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";

export default function BuyBox({ inStock, name }: { inStock: boolean; name: string }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-14 items-center justify-between rounded-full border border-ink/15 bg-white px-2 sm:w-40">
          <button type="button" aria-label="افزایش تعداد" onClick={() => setQty((q) => q + 1)} className="grid size-10 place-items-center rounded-full text-xl hover:bg-sand">+</button>
          <output aria-live="polite" className="font-black">{qty.toLocaleString("fa-IR")}</output>
          <button type="button" aria-label="کاهش تعداد" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-10 place-items-center rounded-full text-xl hover:bg-sand">−</button>
        </div>
        <button
          type="button"
          disabled={!inStock}
          onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2500); }}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-ink font-bold text-cream transition hover:bg-walnut disabled:cursor-not-allowed disabled:bg-ink/30"
        >
          <Icon name={added ? "check" : "cart"} className="size-5" />
          {inStock ? (added ? "به سبد خرید اضافه شد" : "افزودن به سبد خرید") : "ناموجود"}
        </button>
      </div>
      <Link href={`/contact?subject=${encodeURIComponent("استعلام عمده: " + name)}`} className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 text-sm font-bold transition hover:border-brass">
        استعلام قیمت عمده برای کابینت‌سازان
      </Link>
    </div>
  );
}
