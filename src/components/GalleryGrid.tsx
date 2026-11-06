"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/data";
import { ProjectCard } from "./ui";

export default function GalleryGrid({ items }: { items: Project[] }) {
  const styles = useMemo(() => ["همه", ...Array.from(new Set(items.map((p) => p.style)))], [items]);
  const [active, setActive] = useState("همه");
  const list = active === "همه" ? items : items.filter((p) => p.style === active);
  return (
    <>
      <div role="tablist" aria-label="فیلتر سبک طراحی" className="mb-10 flex flex-wrap justify-center gap-2">
        {styles.map((s) => (
          <button key={s} role="tab" aria-selected={active === s} onClick={() => setActive(s)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${active === s ? "bg-ink text-cream" : "bg-white text-ink/70 shadow-soft hover:text-ink"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <div key={p.slug} className={i % 5 === 0 ? "lg:row-span-2" : ""}>
            <ProjectCard p={p} i={i} tall={i % 5 === 0} priority={i < 3} />
          </div>
        ))}
      </div>
    </>
  );
}
