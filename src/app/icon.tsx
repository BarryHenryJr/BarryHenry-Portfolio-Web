import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Initials favicon, replacing the default Next.js icon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#f8fafc",
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        BH
      </div>
    ),
    size
  );
}
