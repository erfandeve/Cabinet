"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const KitchenScene = dynamic(() => import("./KitchenScene"), { ssr: false, loading: () => null });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Loads the WebGL scene after first paint so it never blocks LCP; keeps the CSS poster if WebGL is unavailable. */
export default function HeroCanvas({ poster }: { poster: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!hasWebGL()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const go = () => setReady(true);
    if (w.requestIdleCallback) w.requestIdleCallback(go);
    else setTimeout(go, 300);
  }, []);
  if (!ready) return <>{poster}</>;
  return (
    <div className="absolute inset-0 [animation:fadein_1.2s_ease_both]">
      <style>{`@keyframes fadein{from{opacity:0}to{opacity:1}}`}</style>
      <KitchenScene />
    </div>
  );
}
