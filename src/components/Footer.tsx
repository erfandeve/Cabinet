import Link from "next/link";
import { categories, services } from "@/lib/data";
import { site } from "@/lib/site";
import Icon from "./Icon";
import Logo from "./Logo";

const faDigits = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-coal text-white/70">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-brass/10 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-7">{site.description}</p>
          <div className="mt-6 flex gap-2">
            {(["instagram", "telegram", "whatsapp"] as const).map((s) => (
              <a key={s} href={site.social[s]} target="_blank" rel="noopener noreferrer" aria-label={s} className="grid size-10 place-items-center rounded-full border border-white/10 transition hover:border-brass hover:text-brass">
                <Icon name={s} className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="دسته‌بندی محصولات">
          <h2 className="mb-4 text-sm font-bold text-white">فروشگاه لوازم کابینت</h2>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="transition hover:text-brass">
                  خرید {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="خدمات">
          <h2 className="mb-4 text-sm font-bold text-white">خدمات</h2>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition hover:text-brass">
                  {s.title}
                </Link>
              </li>
            ))}
            <li><Link href="/gallery" className="transition hover:text-brass">نمونه کارها</Link></li>
            <li><Link href="/blog" className="transition hover:text-brass">مجله آرکا</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-bold text-white">اطلاعات تماس</h2>
          <address className="space-y-4 text-sm not-italic">
            <p className="flex gap-3"><Icon name="pin" className="mt-0.5 size-[18px] shrink-0 text-brass" />{site.address.city}، {faDigits(site.address.street)}</p>
            <p className="flex gap-3"><Icon name="phone" className="size-[18px] shrink-0 text-brass" /><a href={`tel:${site.phoneHref}`} dir="ltr">{faDigits(site.phone)}</a> | <a href={`tel:${site.mobileHref}`} dir="ltr">{faDigits(site.mobile)}</a></p>
            <p className="flex gap-3"><Icon name="mail" className="size-[18px] shrink-0 text-brass" /><a href={`mailto:${site.email}`}>{site.email}</a></p>
            {site.hours.map((h) => (
              <p key={h.days} className="flex gap-3"><Icon name="clock" className="size-[18px] shrink-0 text-brass" />{h.days}: {h.time}</p>
            ))}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {faDigits("1405")} {site.name} — تمامی حقوق محفوظ است.</p>
          <ul className="flex gap-5">
            <li><Link href="/about" className="hover:text-brass">درباره ما</Link></li>
            <li><Link href="/contact" className="hover:text-brass">تماس با ما</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-brass">نقشه سایت</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
