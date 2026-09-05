import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f6f5f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#161616",
          fontSize: 72,
          fontWeight: 500,
          letterSpacing: "0.06em",
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
