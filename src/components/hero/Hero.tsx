import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "../Icon";
import { IsoCabinet } from "../ui";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative isolate overflow-hidden bg-coal">
      {/* ambient light */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 size-[640px] rounded-full bg-brass/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[520px] rounded-full bg-sage/30 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255/.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.6)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-x grid min-h-[100svh] items-center gap-6 pb-10 pt-28 lg:grid-cols-[1fr_1.15fr] lg:gap-2 lg:pb-16">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 backdrop-blur">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-brass opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-brass" /></span>
            طراحی سه‌بعدی رایگان با هر سفارش ساخت
          </p>
          <h1 id="hero-title" className="mt-6 text-balance text-[2.5rem] font-black leading-[1.25] text-white sm:text-5xl lg:text-[4.1rem]">
            کابینتی که <span className="bg-gradient-to-l from-brass-light via-brass to-oak bg-clip-text text-transparent">هر جزئیاتش</span> برای شما ساخته شده
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-9 text-white/65">
            فروش تخصصی لوازم و یراق‌آلات کابینت از برندهای Blum، Hettich و Grass؛ همراه با طراحی سه‌بعدی، ساخت و نصب کابینت آشپزخانه در تهران و ارسال لوازم به سراسر ایران.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/categories" className="group inline-flex items-center justify-center gap-3 rounded-full bg-brass px-8 py-4 font-bold text-coal shadow-[0_20px_50px_-15px_rgb(195_155_95/0.8)] transition hover:-translate-y-0.5 hover:bg-brass-light">
              خرید لوازم کابینت
              <Icon name="arrow" className="size-5 transition group-hover:-translate-x-1" />
            </Link>
            <Link href="/gallery" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur transition hover:border-white/40">
              <Icon name="play" className="size-4 text-brass" /> دیدن نمونه کارها
            </Link>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              ["۱۲۵۰+", "پروژه اجراشده"],
              ["۳۴۰۰+", "کالا در انبار"],
              ["۴.۹", "امتیاز مشتریان"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-2xl font-black text-white md:text-3xl">{v}</dd>
                <dd className="mt-1 text-xs text-white/50">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-[440px] sm:h-[540px] lg:h-[680px]">
          <HeroCanvas
            poster={
              <div className="absolute inset-0 grid place-items-center" aria-hidden>
                <IsoCabinet scale={1.3} />
              </div>
            }
          />
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-coal/60 px-4 py-2 text-[11px] text-white/60 backdrop-blur lg:bottom-10">
            <span className="md:hidden">درب‌ها و کشوها را لمس کنید</span>
            <span className="hidden md:inline">نشانگر را روی درب‌ها و کشوها ببرید</span>
          </div>
          <a href={`tel:${site.phoneHref}`} className="floaty absolute right-0 top-6 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 pl-5 text-white backdrop-blur-xl md:flex">
            <span className="grid size-10 place-items-center rounded-xl bg-brass text-coal"><Icon name="phone" className="size-5" /></span>
            <span className="text-right">
              <span className="block text-[11px] text-white/60">مشاوره تلفنی رایگان</span>
              <span className="block text-sm font-bold" dir="ltr">{site.phone.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d])}</span>
            </span>
          </a>
        </div>
      </div>

      {/* brand marquee */}
      <div className="relative border-t border-white/10 bg-black/20 py-5" aria-label="برندهای عرضه‌شده">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="marquee flex w-max gap-14 pr-14 text-lg font-black tracking-widest text-white/30">
            {[...Array(2)].flatMap((_, k) => ["BLUM", "HETTICH", "GRASS", "KESSEBOHMER", "SAMET", "EGGER", "CAESARSTONE", "AGT", "VIEFE"].map((b) => <li key={b + k}>{b}</li>))}
          </ul>
        </div>
      </div>
    </section>
  );
}
