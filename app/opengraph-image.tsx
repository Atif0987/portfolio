import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { siteConfig } from "./data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public", siteConfig.portrait), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f5f3ee",
          padding: "72px 88px",
          color: "#16150f",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#6b685e", textTransform: "uppercase" }}>
            {siteConfig.title}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 24 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 40, color: "#00704a", marginTop: 16 }}>{siteConfig.role}</div>
          <div style={{ fontSize: 28, color: "#57544b", marginTop: 28, lineHeight: 1.4 }}>
            {`${siteConfig.location} · Remote`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 10,
            borderRadius: 9999,
            background: "linear-gradient(140deg, #008060, #e8b931)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img
            src={`data:image/png;base64,${portrait}`}
            width={340}
            height={340}
            alt=""
            style={{ borderRadius: 9999, border: "10px solid #ffffff" }}
          />
        </div>
      </div>
    ),
    size
  );
}
