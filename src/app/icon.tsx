import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
