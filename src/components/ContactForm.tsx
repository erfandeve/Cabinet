"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";

const subjects = ["مشاوره و متره رایگان", "سفارش ساخت کابینت", "خرید لوازم کابینت", "استعلام قیمت عمده", "خدمات پس از فروش", "سایر"];

export default function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("subject");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "");
    if (name.length < 3) errs.name = "لطفاً نام کامل خود را وارد کنید.";
    if (!/^09\d{9}$/.test(phone)) errs.phone = "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // TODO: connect to backend API
    setSent(true);
  }

  if (sent)
    return (
      <div role="status" className="flex flex-col items-center rounded-[28px] bg-white p-10 text-center shadow-soft">
        <span className="grid size-16 place-items-center rounded-full bg-sage text-cream"><Icon name="check" className="size-8" strokeWidth={2.5} /></span>
        <h3 className="mt-6 text-2xl font-black">درخواست شما ثبت شد</h3>
        <p className="mt-3 leading-8 text-muted">کارشناسان ما حداکثر تا ۲ ساعت کاری آینده با شما تماس می‌گیرند.</p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-oak">ارسال درخواست جدید</button>
      </div>
    );

  const field = "h-13 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3.5 text-sm outline-none transition focus:border-brass focus:bg-white focus:ring-4 focus:ring-brass/15";
  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[28px] bg-white p-6 shadow-soft md:p-10">
      <h2 className="text-2xl font-black">فرم درخواست مشاوره</h2>
      <p className="mt-2 text-sm text-muted">فرم را پر کنید تا برای هماهنگی متره رایگان با شما تماس بگیریم.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold">نام و نام خانوادگی *</span>
          <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="e-name" />
          {errors.name && <span id="e-name" className="mt-1.5 block text-xs text-red-700">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">شماره موبایل *</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="09xxxxxxxxx" className={`${field} text-right`} aria-invalid={!!errors.phone} aria-describedby="e-phone" />
          {errors.phone && <span id="e-phone" className="mt-1.5 block text-xs text-red-700">{errors.phone}</span>}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">موضوع</span>
          <select name="subject" defaultValue={preset && !subjects.includes(preset) ? "استعلام قیمت عمده" : preset ?? subjects[0]} className={field}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">شهر / منطقه</span>
          <input name="city" autoComplete="address-level2" placeholder="مثلاً تهران، سعادت‌آباد" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-bold">توضیحات</span>
          <textarea name="message" rows={5} defaultValue={preset ?? ""} placeholder="ابعاد تقریبی آشپزخانه، متریال مورد علاقه یا کالای مورد نیاز…" className={`${field} resize-none`} />
        </label>
      </div>
      <button type="submit" className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink font-bold text-cream transition hover:bg-walnut sm:w-auto sm:px-12">
        ارسال درخواست <Icon name="arrow" className="size-5" />
      </button>
    </form>
  );
}
