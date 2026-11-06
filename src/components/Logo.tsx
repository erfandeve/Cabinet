import { site } from "@/lib/site";

export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9cf9f" />
          <stop offset="1" stopColor="#c39b5f" />
        </linearGradient>
      </defs>
      <path d="M24 4 42 14 24 24 6 14Z" fill="url(#lg-top)" />
      <path d="M6 14 24 24v20L6 34Z" fill="#8a6446" />
      <path d="M42 14 24 24v20l18-10Z" fill="#3a2a20" />
      <path d="M28 27.5v9M33 25v9" stroke="#c39b5f" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.15rem] font-black tracking-tight ${light ? "text-white" : "text-ink"}`}>{site.name}</span>
        <span className={`mt-1 text-[0.62rem] font-semibold tracking-[0.2em] ${light ? "text-white/55" : "text-muted"}`}>ARKA CABINET</span>
      </span>
    </span>
  );
}
