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
  const activity = look ? ACTIVITY_META[look.activity].en : "LOOK";

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
        <div style={{ fontSize: 16, letterSpacing: "0.28em", color: "#9a9a9a" }}>
          GYUBOOK
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 14, letterSpacing: "0.28em", color: "#9a9a9a" }}>
            {activity}
          </div>
          <div style={{ marginTop: 14, fontSize: 76, fontWeight: 400 }}>{title}</div>
        </div>
        <div style={{ fontSize: 14, letterSpacing: "0.28em", color: "#9a9a9a" }}>
          LOADOUT
        </div>
      </div>
    ),
    { ...size },
  );
}
