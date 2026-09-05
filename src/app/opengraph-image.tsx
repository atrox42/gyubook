import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "56px 64px",
        }}
      >
        <div style={{ fontSize: 16, letterSpacing: "0.42em", color: "#9a9a9a" }}>
          VOL. 01
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, letterSpacing: "0.2em", fontWeight: 500 }}>
            GYUBOOK
          </div>
          <div style={{ marginTop: 18, fontSize: 22, letterSpacing: "0.16em", color: "#9a9a9a" }}>
            LOOKBOOK · WHITE · OUTFIT ONLY
          </div>
        </div>
        <div style={{ fontSize: 16, letterSpacing: "0.28em", color: "#9a9a9a" }}>
          규북
        </div>
      </div>
    ),
    { ...size },
  );
}
