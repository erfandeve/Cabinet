import Image from "next/image";
import Link from "next/link";
import { discount, getCategory, toman, type Post, type Product, type Project, type Service } from "@/lib/data";
import { breadcrumbLd } from "@/lib/seo";
import { site } from "@/lib/site";
import Icon from "./Icon";
import { Reveal, Tilt } from "./Interactive";
import ProductArt from "./ProductArt";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function SectionHead({ eyebrow, title, text, center = false, light = false, action }: { eyebrow: string; title: string; text?: string; center?: boolean; light?: boolean; action?: { href: string; label: string } }) {
  return (
    <div className={`mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${center ? "items-center text-center md:flex-col md:items-center" : ""}`}>
      <div className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        <span className={`eyebrow ${light ? "!text-brass-light" : ""}`}>{eyebrow}</span>
        <h2 className={`mt-4 text-balance text-3xl font-black leading-[1.35] md:text-[2.6rem] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
        {text && <p className={`mt-4 leading-8 ${light ? "text-white/60" : "text-muted"}`}>{text}</p>}
      </div>
      {action && (
        <Link href={action.href} className={`group inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition ${light ? "border-white/15 text-white hover:border-brass" : "border-ink/15 hover:border-ink hover:bg-ink hover:text-cream"}`}>
          {action.label}
          <Icon name="arrow" className="size-4 transition group-hover:-translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export function Breadcrumbs({ items, light = false }: { items: { name: string; path: string }[]; light?: boolean }) {
  const all = [{ name: "خانه", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="مسیر صفحه">
        <ol className={`flex flex-wrap items-center gap-2 text-sm ${light ? "text-white/55" : "text-muted"}`}>
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={it.path} className="transition hover:text-brass">{it.name}</Link>
                  <span aria-hidden>/</span>
                </>
              ) : (
                <span aria-current="page" className={light ? "text-white" : "text-ink"}>{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({ title, text, crumbs, image }: { title: string; text: string; crumbs: { name: string; path: string }[]; image?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-coal pb-16 pt-32 md:pb-24 md:pt-40">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />}
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/80 to-coal/40" />
      <div className="pointer-events-none absolute -left-24 top-10 size-96 rounded-full bg-brass/15 blur-3xl" />
      {/* floating isometric blocks */}
      <div aria-hidden className="pointer-events-none absolute left-[8%] top-1/2 hidden -translate-y-1/2 lg:block">
        <IsoCabinet />
      </div>
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} light />
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-black leading-[1.3] text-white md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{text}</p>
      </div>
    </section>
  );
}

/** Pure CSS 3D isometric cabinet, used as decoration. */
export function IsoCabinet({ scale = 1 }: { scale?: number }) {
  const W = 150 * scale, H = 190 * scale, D = 90 * scale;
  const face = "absolute left-0 top-0";
  return (
    <div className="floaty" style={{ perspective: 900 }}>
      <div className="cube" style={{ width: W, height: H, transform: "rotateX(-18deg) rotateY(-38deg)" }}>
        <div className={face} style={{ width: W, height: H, transform: `translateZ(${D / 2}px)`, background: "linear-gradient(160deg,#4a3528,#2a1d16)", border: "1px solid rgb(195 155 95 / .3)" }}>
          <div className="absolute inset-[8%] grid grid-rows-3 gap-[6%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative rounded-sm border border-brass/30 bg-white/[0.03]">
                <span className="absolute left-1/2 top-1/2 h-[3px] w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass" />
              </div>
            ))}
          </div>
        </div>
        <div className={face} style={{ width: D, height: H, transform: `rotateY(90deg) translateZ(${W - D / 2}px)`, background: "#1e1510" }} />
        <div className={face} style={{ width: D, height: H, transform: `rotateY(-90deg) translateZ(${D / 2}px)`, background: "#20160f" }} />
        <div className={face} style={{ width: W, height: D, transform: `rotateX(90deg) translateZ(${D / 2}px)`, background: "linear-gradient(135deg,#efe7db,#cbbfae)" }} />
      </div>
    </div>
  );
}

export function ProductCard({ p, i = 0 }: { p: Product; i?: number }) {
  const cat = getCategory(p.category)!;
  const off = discount(p);
  return (
    <Reveal delay={(i % 4) * 70} as="article">
      <Tilt max={6} className="group h-full rounded-[22px] bg-white shadow-soft">
        <Link href={`/products/${p.slug}`} className="flex h-full flex-col p-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-sand to-cream">
            <ProductArt kind={cat.icon} hue={cat.hue} className="pop absolute inset-[10%] transition duration-700 group-hover:scale-105" />
            <div className="absolute right-3 top-3 flex flex-col gap-1.5">
              {p.badge && <span className="rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-bold text-cream">{p.badge}</span>}
              {off > 0 && <span className="rounded-full bg-brass px-2.5 py-1 text-[0.7rem] font-bold text-coal">٪{off.toLocaleString("fa-IR")} تخفیف</span>}
            </div>
            {!p.inStock && <span className="absolute inset-x-3 bottom-3 rounded-xl bg-white/85 py-1.5 text-center text-xs font-bold text-muted backdrop-blur">ناموجود — تماس بگیرید</span>}
          </div>
          <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{p.brand}</span>
              <span className="flex items-center gap-1"><Icon name="star" className="size-3.5 text-brass" />{p.rating.toLocaleString("fa-IR")}</span>
            </div>
            <h3 className="mt-2 font-bold leading-7 text-ink">{p.name}</h3>
            <div className="mt-auto flex items-end justify-between pt-4">
              <div>
                {p.oldPrice && <del className="block text-xs text-muted/70">{toman(p.oldPrice)}</del>}
                <span className="text-[1.05rem] font-black text-ink">{toman(p.price)}</span>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-ink text-cream transition group-hover:bg-brass group-hover:text-coal" aria-hidden>
                <Icon name="cart" className="size-[18px]" />
              </span>
            </div>
          </div>
        </Link>
      </Tilt>
    </Reveal>
  );
}

export function ProjectCard({ p, i = 0, tall = false, priority = false }: { p: Project; i?: number; tall?: boolean; priority?: boolean }) {
  return (
    <Reveal delay={(i % 3) * 90} as="article" className="h-full">
      <Tilt max={5} className="group h-full overflow-hidden rounded-[26px] shadow-deep">
        <Link href={`/gallery/${p.slug}`} className={`relative block h-full ${tall ? "min-h-[460px]" : "min-h-[340px]"}`}>
          <Image src={p.image} alt={`${p.title} - ${p.material}`} fill priority={priority} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/90 via-coal/20 to-transparent" />
          <div className="pop absolute inset-x-0 bottom-0 p-6">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {p.tags.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.7rem] text-white backdrop-blur">{t}</span>
              ))}
            </div>
            <h3 className="text-xl font-black text-white">{p.title}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/65"><Icon name="pin" className="size-4" />{p.location} · {p.year}</p>
          </div>
          <span className="pop-sm absolute left-5 top-5 grid size-11 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden>
            <Icon name="arrowUpLeft" className="size-5" />
          </span>
        </Link>
      </Tilt>
    </Reveal>
  );
}

export function PostCard({ p, i = 0 }: { p: Post; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 90} as="article">
      <Link href={`/blog/${p.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] shadow-soft">
          <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur">{p.category}</span>
        </div>
        <div className="px-1 pt-5">
          <p className="text-xs text-muted"><time dateTime={p.date}>{p.dateFa}</time> · {p.readTime} مطالعه</p>
          <h3 className="mt-2 text-lg font-bold leading-8 transition group-hover:text-oak">{p.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{p.excerpt}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function ServiceCard({ s, i = 0, dark = false }: { s: Service; i?: number; dark?: boolean }) {
  return (
    <Reveal delay={(i % 3) * 80} as="article" className="h-full">
      <Tilt max={7} className={`group h-full rounded-[26px] border p-7 transition-colors ${dark ? "border-white/10 bg-white/[0.04] hover:border-brass/50" : "border-ink/8 bg-white shadow-soft hover:border-brass/50"}`}>
        <Link href={`/services/${s.slug}`} className="flex h-full flex-col">
          <span className="pop grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brass-light to-brass text-coal shadow-[0_12px_30px_-10px_rgb(195_155_95/0.8)]">
            <Icon name={s.icon} className="size-7" />
          </span>
          <h3 className={`pop-sm mt-6 text-xl font-black ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
          <p className={`mt-3 flex-1 leading-7 ${dark ? "text-white/60" : "text-muted"}`}>{s.short}</p>
          <span className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${dark ? "text-brass-light" : "text-oak"}`}>
            جزئیات خدمت <Icon name="arrow" className="size-4 transition group-hover:-translate-x-1" />
          </span>
        </Link>
      </Tilt>
    </Reveal>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 rounded-[26px] border border-ink/10 bg-white px-6 shadow-soft md:px-8">
      {items.map((f, i) => (
        <details key={f.q} className="group py-5" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-right font-bold leading-7">
            <h3>{f.q}</h3>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand text-lg transition group-open:rotate-45 group-open:bg-brass">+</span>
          </summary>
          <p className="mt-3 leading-8 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="container-x py-20">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-[32px] bg-walnut px-6 py-14 text-center md:px-16 md:py-20 md:text-right">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brass/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-6 left-10 hidden md:block"><IsoCabinet scale={0.8} /></div>
          <div className="relative max-w-2xl">
            <span className="eyebrow !text-brass-light">متره و طراحی رایگان</span>
            <h2 className="mt-4 text-balance text-3xl font-black leading-[1.4] text-white md:text-5xl">آشپزخانه رویایی‌تان را قبل از ساخت، سه‌بعدی ببینید.</h2>
            <p className="mt-5 leading-8 text-white/65">کارشناسان ما رایگان به محل شما می‌آیند، اندازه می‌گیرند و طرح سه‌بعدی اختصاصی‌تان را آماده می‌کنند.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <Link href="/contact" className="rounded-full bg-brass px-7 py-4 font-bold text-coal transition hover:-translate-y-0.5 hover:bg-brass-light">رزرو وقت مشاوره</Link>
              <a href={`tel:${site.phoneHref}`} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-bold text-white transition hover:border-brass">
                <Icon name="phone" className="size-5" /> تماس مستقیم
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
