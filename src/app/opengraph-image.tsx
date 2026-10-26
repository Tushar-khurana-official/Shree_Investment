import { ImageResponse } from "next/og";
import { site } from "@config";

export const alt = `${site.firm.name}: ${site.firm.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F5EEDC", padding: 72, fontFamily: "serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#0A6A4A" }} />
          <div style={{ fontSize: 40, color: "#1B2420" }}>{site.firm.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, color: "#1B2420", maxWidth: 980 }}>{site.firm.tagline}</div>
        <div style={{ display: "flex", fontSize: 26, color: "#5C6661", fontFamily: "sans-serif" }}>
          AMFI-registered mutual fund distributor · {site.registration.arn}
        </div>
      </div>
    ),
    size,
  );
}
