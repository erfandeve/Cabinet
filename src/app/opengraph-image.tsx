import { ImageResponse } from "next/og";

export const alt = "Arka Cabinet — Cabinet hardware & 3D kitchen design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(135deg,#12100e 0%,#2a1d16 60%,#3a2a20 100%)", color: "white", padding: 80, alignItems: "center", justifyContent: "space-between", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 26, letterSpacing: 8, color: "#e2c493" }}>ARKA CABINET</div>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>Cabinet Hardware & 3D Kitchen Design</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "rgba(255,255,255,.65)" }}>Hinges · Drawer slides · Lift systems · Handles</div>
        </div>
        <svg width="340" height="340" viewBox="0 0 48 48">
          <path d="M24 4 42 14 24 24 6 14Z" fill="#e2c493" />
          <path d="M6 14 24 24v20L6 34Z" fill="#8a6446" />
          <path d="M42 14 24 24v20l18-10Z" fill="#5a4030" />
          <path d="M28 27.5v9M33 25v9" stroke="#e2c493" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
