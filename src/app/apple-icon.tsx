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
          background: "#0b0d0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            border: "3px solid #c67a38",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e8e2d4",
            fontSize: 64,
            fontWeight: 600,
          }}
        >
          G
        </div>
      </div>
    ),
    { ...size },
  );
}
