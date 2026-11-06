import Link from "next/link";
import { IsoCabinet } from "@/components/ui";

export const metadata = { title: "صفحه پیدا نشد", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain flex min-h-[90svh] items-center bg-coal pt-24 text-white">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-8xl font-black text-brass">۴۰۴</p>
          <h1 className="mt-4 text-3xl font-black">این کشو خالی است!</h1>
          <p className="mt-4 leading-8 text-white/60">صفحه‌ای که دنبالش بودید پیدا نشد. شاید در فروشگاه یا نمونه کارهای ما چیزی که می‌خواهید باشد.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/" className="rounded-full bg-brass px-6 py-3 font-bold text-coal">صفحه اصلی</Link>
            <Link href="/categories" className="rounded-full border border-white/20 px-6 py-3 font-bold">فروشگاه</Link>
          </div>
        </div>
        <div className="hidden justify-center md:flex"><IsoCabinet scale={1.3} /></div>
      </div>
    </section>
  );
}
