import { ImageResponse } from "next/og";
import { METRICS, PROFILE } from "@/lib/constants";

export const alt = `${PROFILE.name}, ${PROFILE.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Preview card shown when the site link is pasted into LinkedIn, Slack, email, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0f172a",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#4ade80" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#22c55e" }} />
          {`${PROFILE.availability} · ${PROFILE.location}`}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 42, color: "#94a3b8", marginTop: 8 }}>{PROFILE.headline}</div>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          {METRICS.slice(0, 3).map((metric) => (
            <div key={metric.id} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 48, fontWeight: 700 }}>{metric.value}</div>
              <div style={{ fontSize: 22, color: "#94a3b8" }}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
