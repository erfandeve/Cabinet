import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero/Hero";
import Icon from "@/components/Icon";
import { Counter, Reveal, Tilt } from "@/components/Interactive";
import ProductArt from "@/components/ProductArt";
import { CtaBand, Faq, JsonLd, PostCard, ProductCard, ProjectCard, SectionHead, ServiceCard } from "@/components/ui";
import { categories, faqs, img, posts, products, productsOf, projects, services, stats, testimonials } from "@/lib/data";
import { buildMetadata, faqLd, itemListLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${site.name} | فروش لوازم و یراق‌آلات کابینت، طراحی و ساخت کابینت آشپزخانه`,
  description: site.description,
  path: "/",
  image: img.k1,
});

const perks = [
  { icon: "truck", t: "ارسال به سراسر ایران", d: "تحویل تهران ۲۴ ساعته" },
  { icon: "shield", t: "ضمانت اصالت کالا", d: "فاکتور رسمی و گارانتی" },
  { icon: "ruler", t: "متره و مشاوره رایگان", d: "تهران و کرج" },
  { icon: "cube", t: "طراحی سه‌بعدی", d: "قبل از ساخت ببینید" },
];

const steps = [
  { t: "مشاوره و متره", d: "کارشناس ما با متر لیزری فضا را دقیق اندازه می‌گیرد و نیازهای شما را بررسی می‌کند." },
  { t: "طراحی سه‌بعدی", d: "رندر واقع‌گرایانه با متریال و یراق انتخابی شما؛ تا رضایت کامل تغییر می‌دهیم." },
  { t: "تولید با CNC", d: "برش، لبه‌چسبانی و سوراخ‌کاری دقیق در کارگاه مجهز آرکا با کنترل کیفیت چندمرحله‌ای." },
  { t: "نصب و تحویل", d: "نصب تمیز و سریع توسط تیم متخصص، همراه با برگه ضمانت ۵ ساله." },
];

export default function Home() {
  const featured = projects.slice(0, 5);
  const bestSellers = products.filter((p) => p.badge).slice(0, 8);
  return (
    <>
      <JsonLd data={[faqLd(faqs), itemListLd("دسته‌بندی لوازم کابینت", categories.map((c) => ({ name: c.name, path: `/categories/${c.slug}` })))]} />
      <Hero />

      {/* perks */}
      <section aria-label="مزایای خرید" className="relative z-10 -mt-px border-b border-ink/5 bg-cream">
        <ul className="container-x grid grid-cols-2 gap-y-6 py-8 lg:grid-cols-4">
          {perks.map((p) => (
            <li key={p.t} className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand text-oak"><Icon name={p.icon} className="size-6" /></span>
              <span>
                <span className="block text-sm font-bold">{p.t}</span>
                <span className="block text-xs text-muted">{p.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* categories */}
      <section className="container-x py-24">
        <SectionHead eyebrow="فروشگاه یراق‌آلات" title="هر آنچه کابینت شما نیاز دارد، در یک‌جا" text="لولا، ریل، جک، دستگیره، سبد سوپری و صفحه کابینت از معتبرترین برندهای اروپایی و ترک با قیمت رقابتی و ضمانت اصالت." action={{ href: "/categories", label: "همه دسته‌بندی‌ها" }} />
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 70}>
              <Tilt max={10} className="group h-full rounded-[24px] bg-white shadow-soft">
                <Link href={`/categories/${c.slug}`} className="flex h-full flex-col p-4 md:p-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-gradient-to-br from-sand via-cream to-white">
                    <div className="absolute inset-x-6 bottom-3 h-6 rounded-[50%] bg-ink/10 blur-md" />
                    <ProductArt kind={c.icon} hue={c.hue} className="pop absolute inset-[6%] transition duration-700 group-hover:-translate-y-2 group-hover:scale-105" />
                  </div>
                  <h3 className="pop-sm mt-4 text-base font-black md:text-lg">{c.name}</h3>
                  <p className="mt-1 text-xs leading-6 text-muted md:text-sm">{c.short}</p>
                  <span className="mt-3 flex items-center justify-between text-xs font-bold text-oak">
                    {productsOf(c.slug).length.toLocaleString("fa-IR")} محصول
                    <Icon name="arrow" className="size-4 transition group-hover:-translate-x-1" />
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* projects */}
      <section aria-labelledby="projects-title" className="bg-sand/60 py-24">
        <div className="container-x">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow">گالری نمونه کارها</span>
              <h2 id="projects-title" className="mt-4 text-balance text-3xl font-black leading-[1.35] md:text-[2.6rem]">آشپزخانه‌هایی که ساخته‌ایم؛ هر کدام یک داستان</h2>
            </div>
            <Link href="/gallery" className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-bold transition hover:bg-ink hover:text-cream">
              مشاهده همه پروژه‌ها <Icon name="arrow" className="size-4 transition group-hover:-translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <div className="md:col-span-2 lg:row-span-2"><ProjectCard p={featured[0]} tall /></div>
            {featured.slice(1).map((p, i) => (
              <div key={p.slug}><ProjectCard p={p} i={i + 1} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* services (dark) */}
      <section className="grain relative overflow-hidden bg-coal py-24">
        <div className="pointer-events-none absolute -left-40 top-0 size-[500px] rounded-full bg-brass/10 blur-3xl" />
        <div className="container-x relative">
          <SectionHead light eyebrow="خدمات آرکا" title="از ایده تا نصب؛ همه را به ما بسپارید" text="تیم طراحی، کارگاه تولید و گروه نصب آرکا در کنار هم، آشپزخانه‌ای دقیق، بادوام و زیبا برای شما می‌سازند." action={{ href: "/services", label: "همه خدمات" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} dark />)}
          </div>
        </div>
      </section>

      {/* best sellers */}
      <section className="container-x py-24">
        <SectionHead eyebrow="پرفروش‌ترین‌ها" title="انتخاب نصاب‌ها و طراحان حرفه‌ای" action={{ href: "/categories", label: "ورود به فروشگاه" }} />
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {bestSellers.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
        </div>
      </section>

      {/* why us + stats */}
      <section aria-labelledby="why" className="container-x pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative" style={{ perspective: 1400 }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-deep [transform:rotateY(8deg)_rotateX(2deg)]">
                <Image src={img.k6} alt="کارگاه و نمونه کار کابینت آرکا" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-4 w-[55%] overflow-hidden rounded-[24px] border-[6px] border-cream shadow-deep [transform:translateZ(60px)] md:-right-10">
                <div className="relative aspect-square">
                  <Image src={img.k3} alt="جزئیات دستگیره و درب کابینت" fill sizes="25vw" className="object-cover" />
                </div>
              </div>
              <div className="floaty absolute -left-2 top-10 rounded-2xl bg-white p-4 shadow-deep md:-left-8">
                <p className="text-3xl font-black text-oak">۱۰ سال</p>
                <p className="text-xs text-muted">خدمات پس از فروش</p>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <span className="eyebrow">چرا آرکا؟</span>
            <h2 id="why" className="mt-4 text-balance text-3xl font-black leading-[1.35] md:text-[2.6rem]">۱۳ سال تجربه در ساخت کابینت و تأمین یراق‌آلات اصل</h2>
            <p className="mt-5 leading-8 text-muted">
              آرکا کابینت از سال {site.founded} با تمرکز بر کیفیت ساخت و تأمین مستقیم یراق‌آلات از نمایندگی‌های رسمی، به یکی از مراجع تخصصی لوازم کابینت در تهران تبدیل شده است. ما فقط کابینت نمی‌فروشیم؛ فضایی می‌سازیم که هر روز با لذت در آن آشپزی کنید.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {["یراق‌آلات اصل با کد رهگیری", "کارگاه مجهز به CNC و پانل‌بر", "قیمت عمده برای کابینت‌سازان", "قرارداد شفاف و زمان تحویل تضمینی"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm font-medium">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sage text-cream"><Icon name="check" className="size-3.5" strokeWidth={2.5} /></span>
                  {t}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-soft">
                  <dd className="text-3xl font-black text-ink"><Counter value={s.value} suffix={s.suffix} /></dd>
                  <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="bg-walnut py-24 text-white">
        <div className="container-x">
          <SectionHead light center eyebrow="مراحل همکاری" title="چهار قدم تا آشپزخانه رویایی" />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.t} as="li" delay={i * 100}>
                <div className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7">
                  <span className="absolute -left-2 -top-6 text-[7rem] font-black leading-none text-white/[0.05]">{(i + 1).toLocaleString("fa-IR")}</span>
                  <span className="grid size-11 place-items-center rounded-full bg-brass font-black text-coal">{(i + 1).toLocaleString("fa-IR")}</span>
                  <h3 className="mt-5 text-lg font-black">{s.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* testimonials */}
      <section className="container-x py-24">
        <SectionHead center eyebrow="نظر مشتریان" title="رضایت شما، بهترین تبلیغ ماست" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-[24px] bg-white p-7 shadow-soft">
                <div className="flex gap-0.5 text-brass" aria-label={`امتیاز ${t.rating} از ۵`}>
                  {Array.from({ length: t.rating }).map((_, k) => <Icon key={k} name="star" className="size-4" />)}
                </div>
                <blockquote className="mt-4 flex-1 leading-8 text-ink/80">«{t.text}»</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="grid size-11 place-items-center rounded-full bg-sand font-black text-oak">{t.name[0]}</span>
                  <span><span className="block text-sm font-bold">{t.name}</span><span className="block text-xs text-muted">{t.role}</span></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* blog */}
      <section className="bg-sand/60 py-24">
        <div className="container-x">
          <SectionHead eyebrow="مجله آرکا" title="راهنمای خرید و ایده‌های طراحی کابینت" action={{ href: "/blog", label: "همه مقالات" }} />
          <div className="grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* faq + seo copy */}
      <section aria-labelledby="faq" className="container-x py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="eyebrow">سؤالات متداول</span>
            <h2 id="faq" className="mt-4 text-3xl font-black leading-[1.35] md:text-[2.6rem]">پاسخ سؤالات رایج درباره خرید و ساخت کابینت</h2>
            <div className="mt-6 space-y-4 text-sm leading-8 text-muted">
              <p>
                <strong className="text-ink">خرید لوازم کابینت</strong> یکی از مهم‌ترین مراحل ساخت آشپزخانه است؛ کیفیت <Link href="/categories/hinges" className="font-bold text-oak underline-offset-4 hover:underline">لولا</Link>، <Link href="/categories/drawer-slides" className="font-bold text-oak underline-offset-4 hover:underline">ریل کشو</Link> و <Link href="/categories/lift-systems" className="font-bold text-oak underline-offset-4 hover:underline">جک کابینت</Link> مستقیماً روی عمر و حس استفاده روزانه اثر می‌گذارد.
              </p>
              <p>
                آرکا کابینت با تأمین مستقیم <strong className="text-ink">یراق‌آلات کابینت</strong> از برندهای معتبر و ارائه خدمات <Link href="/services/3d-design" className="font-bold text-oak underline-offset-4 hover:underline">طراحی سه‌بعدی کابینت</Link> و <Link href="/services/kitchen-cabinets" className="font-bold text-oak underline-offset-4 hover:underline">ساخت کابینت آشپزخانه</Link>، همه نیازهای شما را در یک‌جا پوشش می‌دهد.
              </p>
            </div>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
