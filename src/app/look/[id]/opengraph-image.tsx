import { ImageResponse } from "next/og";
import { getLook } from "@/data/looks";
import { ACTIVITY_META } from "@/lib/activity";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function LookOpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const look = getLook(id);
  const title = look?.title ?? "GYUBOOK";
  const code = look?.code ?? "LK-00";
  const activity = look ? ACTIVITY_META[look.activity].en : "FIELD";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(155deg, #1c2c20 0%, #0b0d0a 55%, #1a140e 100%)",
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
          <span>GYUBOOK</span>
          <span>{code}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: "0.24em", color: "#e4a85a" }}>
            {activity}
          </div>
          <div style={{ marginTop: 16, fontSize: 80, fontWeight: 600 }}>{title}</div>
        </div>
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.18em",
            color: "#b7af9d",
          }}
        >
          {look ? `${look.location} · ${look.elevationM}m` : "FIELD ARCHIVE"}
        </div>
      </div>
    ),
    { ...size },
  );
}
