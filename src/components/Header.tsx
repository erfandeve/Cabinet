"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import Icon from "./Icon";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const dark = onHome && !scrolled && !open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-cream/85 shadow-[0_1px_0_rgb(27_23_20/0.06)] backdrop-blur-xl" : onHome ? "bg-transparent" : "bg-cream/70 backdrop-blur-md"}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} - صفحه اصلی`} className="shrink-0">
          <Logo light={dark} />
        </Link>

        <nav aria-label="منوی اصلی" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${dark ? "text-white/80 hover:text-white" : "text-ink/70 hover:text-ink"} ${isActive(n.href) ? (dark ? "!text-white" : "!text-ink") : ""}`}
                >
                  {n.label}
                  {isActive(n.href) && <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-brass" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${site.phoneHref}`} className={`hidden items-center gap-2 text-sm font-semibold md:flex ${dark ? "text-white" : "text-ink"}`}>
            <span dir="ltr">{site.phone.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d])}</span>
            <Icon name="phone" className="size-4 text-brass" />
          </a>
          <Link href="/contact" className="hidden rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-coal shadow-[0_8px_24px_-8px_rgb(195_155_95/0.7)] transition hover:-translate-y-0.5 hover:bg-brass-light sm:inline-flex">
            مشاوره رایگان
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            className={`grid size-11 place-items-center rounded-full lg:hidden ${dark ? "text-white" : "text-ink"}`}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-72px)] overflow-y-auto bg-cream lg:hidden">
        <nav aria-label="منوی موبایل" className="container-x py-6">
          <ul className="divide-y divide-ink/10">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="flex items-center justify-between py-4 text-lg font-semibold">
                  {n.label}
                  <Icon name="arrow" className="size-5 text-brass" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href={`tel:${site.phoneHref}`} className="flex items-center justify-center gap-2 rounded-2xl bg-ink py-4 font-bold text-cream">
              <Icon name="phone" className="size-5" /> تماس فوری
            </a>
            <Link href="/contact" className="flex items-center justify-center rounded-2xl bg-brass py-4 font-bold text-coal">
              رزرو متره و مشاوره رایگان
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
