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
        <div style={{ fontSize: 18, letterSpacing: "0.28em", color: "#8a8680" }}>
          FIELD ARCHIVE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, letterSpacing: "0.18em", fontWeight: 500 }}>
            GYUBOOK
          </div>
          <div style={{ marginTop: 16, fontSize: 24, color: "#8a8680" }}>
            hiking · trekking · trail running
          </div>
        </div>
        <div style={{ fontSize: 18, letterSpacing: "0.2em", color: "#8a8680" }}>
          LOOKBOOK
        </div>
      </div>
    ),
    { ...size },
  );
}
