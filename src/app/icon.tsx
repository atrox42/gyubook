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
          background: "#0b0d0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            border: "1.5px solid #c67a38",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e4a85a",
            fontSize: 11,
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
