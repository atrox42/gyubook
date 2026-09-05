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
          background: "linear-gradient(160deg, #1c2c20 0%, #0b0d0a 48%, #16110c 100%)",
          color: "#e8e2d4",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.28em",
            color: "#e4a85a",
          }}
        >
          <span>FIELD ARCHIVE</span>
          <span>VOL. 01</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, letterSpacing: "0.12em", fontWeight: 600 }}>
            GYUBOOK
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 28,
              color: "#b7af9d",
              letterSpacing: "0.06em",
            }}
          >
            dawn ridge · damp trail · quiet focus
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.2em",
            color: "#b7af9d",
          }}
        >
          <span>HIKING / TREKKING / TRAIL RUN</span>
          <span>LOOKBOOK</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
