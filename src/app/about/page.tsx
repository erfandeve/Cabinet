import Image from "next/image";
import Icon from "@/components/Icon";
import { Counter, Reveal, Tilt } from "@/components/Interactive";
import { CtaBand, JsonLd, PageHero, SectionHead } from "@/components/ui";
import { img, stats } from "@/lib/data";
import { absUrl, site } from "@/lib/site";
import { buildMetadata, orgId } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "درباره ما | ۱۳ سال تجربه در ساخت کابینت و یراق‌آلات",
  description: "آشنایی با آرکا کابینت؛ تولیدکننده کابینت آشپزخانه و تأمین‌کننده یراق‌آلات کابینت اصل در تهران از سال ۱۳۹۲، با کارگاه مجهز CNC و تیم طراحی سه‌بعدی.",
  path: "/about",
  image: img.k6,
});

const values = [
  { icon: "shield", t: "صداقت در متریال", d: "هر آنچه در قرارداد می‌نویسیم، همان را نصب می‌کنیم؛ با برگه اصالت." },
  { icon: "ruler", t: "دقت میلی‌متری", d: "برش CNC و کنترل کیفیت چندمرحله‌ای برای درزهای یکنواخت و درب‌های هم‌تراز." },
  { icon: "sparkle", t: "طراحی ماندگار", d: "زیبایی‌ای که با گذر زمان کهنه نمی‌شود؛ ترکیب ترند و کاربرد." },
  { icon: "clock", t: "تحویل به‌موقع", d: "زمان‌بندی شفاف و تعهد به تاریخ نصب ثبت‌شده در قرارداد." },
];

const team = [
  { n: "مهندس امیر حسینی", r: "بنیان‌گذار و مدیر تولید" },
  { n: "مهندس سارا کریمی", r: "مدیر طراحی داخلی" },
  { n: "رضا موسوی", r: "سرپرست تیم نصب" },
  { n: "مینا جعفری", r: "مدیر فروش یراق‌آلات" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", url: absUrl("/about"), name: `درباره ${site.name}`, mainEntity: { "@id": orgId } }} />
      <PageHero title="ما آشپزخانه می‌سازیم، نه فقط کابینت" text={`آرکا کابینت از سال ${site.founded} با یک کارگاه کوچک شروع کرد و امروز با بیش از ۴۰ متخصص، یکی از مراجع تخصصی کابینت و یراق‌آلات در تهران است.`} crumbs={[{ name: "درباره ما", path: "/about" }]} image={img.k2} />
      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div>
          <span className="eyebrow">داستان ما</span>
          <h2 className="mt-4 text-3xl font-black leading-[1.4] md:text-4xl">از یک کارگاه ۵۰ متری تا بیش از ۱۲۵۰ آشپزخانه</h2>
          <div className="mt-6 space-y-4 leading-9 text-ink/75">
            <p>ایده آرکا از یک مشکل ساده شکل گرفت: مشتریانی که کابینت می‌خریدند اما نمی‌دانستند داخل آن چه یراقی استفاده شده است. ما تصمیم گرفتیم شفاف باشیم؛ هر لولا، ریل و جکی که نصب می‌کنیم، برند و کد اصالت دارد.</p>
            <p>امروز آرکا دو بخش اصلی دارد: <strong>فروشگاه تخصصی لوازم و یراق‌آلات کابینت</strong> که به کابینت‌سازان و مصرف‌کنندگان سراسر ایران خدمت می‌کند، و <strong>استودیوی طراحی و کارگاه تولید</strong> که آشپزخانه‌های اختصاصی را از طراحی سه‌بعدی تا نصب اجرا می‌کند.</p>
          </div>
        </div>
        <Reveal>
          <div className="relative" style={{ perspective: 1400 }}>
            <Tilt max={6} className="overflow-hidden rounded-[32px] shadow-deep">
              <div className="relative aspect-[5/4]"><Image src={img.k10} alt="فضای کارگاه و نمونه کار آرکا" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></div>
            </Tilt>
          </div>
        </Reveal>
      </section>
      <section className="bg-coal py-20 text-white">
        <dl className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="text-4xl font-black text-brass-light md:text-5xl"><Counter value={s.value} suffix={s.suffix} /></dd>
              <dt className="mt-2 text-sm text-white/60">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>
      <section className="container-x py-24">
        <SectionHead center eyebrow="ارزش‌های ما" title="آنچه ما را متفاوت می‌کند" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 80}>
              <Tilt className="h-full rounded-[24px] bg-white p-7 shadow-soft">
                <span className="pop grid size-12 place-items-center rounded-2xl bg-sand text-oak"><Icon name={v.icon} className="size-6" /></span>
                <h3 className="pop-sm mt-5 text-lg font-black">{v.t}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{v.d}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-sand/60 py-24">
        <div className="container-x">
          <SectionHead center eyebrow="تیم آرکا" title="آدم‌هایی که پشت هر پروژه هستند" />
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((t, i) => (
              <Reveal as="li" key={t.n} delay={i * 80}>
                <div className="rounded-[24px] bg-white p-6 text-center shadow-soft">
                  <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-brass-light to-oak text-2xl font-black text-white">{t.n.replace("مهندس ", "")[0]}</span>
                  <p className="mt-4 font-black">{t.n}</p>
                  <p className="mt-1 text-xs text-muted">{t.r}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
