import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "./site";

// Shared renderer for every social-sharing image (1200x630). Route files
// (app/**/opengraph-image.tsx) call renderOgImage with page-specific copy so
// each page gets a card that matches its title, in brand colors and fonts,
// with the mascot on the right.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgInput {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** Platform identity color for the eyebrow dot (hex) */
  accent?: string;
}

// Paths are statically scoped so the bundler traces only these folders.
async function font(file: string) {
  return readFile(join(process.cwd(), "app", "fonts", "og", file));
}

async function mascotDataUrl() {
  const buf = await readFile(
    join(process.cwd(), "public", "brand", "mascot-og.png")
  );
  return `data:image/png;base64,${buf.toString("base64")}`;
}

const PLATFORMS = [
  "TikTok",
  "YouTube",
  "Instagram",
  "Facebook",
  "X",
  "Reddit",
  "Pinterest",
  "Twitch",
  "SoundCloud",
];

export async function renderOgImage(input: OgInput) {
  const [black, extra, inter, mascot] = await Promise.all([
    font("Nunito-Black.woff"),
    font("Nunito-ExtraBold.woff"),
    font("Inter-Medium.woff"),
    mascotDataUrl(),
  ]);

  const titleSize = input.title.length > 44 ? 54 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "56px 64px",
          background:
            "radial-gradient(800px 480px at 8% 0%, rgba(139,92,246,0.35), transparent 60%), radial-gradient(600px 400px at 100% 100%, rgba(59,59,245,0.35), transparent 60%), #0b0b14",
          color: "#fafafc",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Nunito",
              fontWeight: 900,
              fontSize: 40,
              letterSpacing: -1,
            }}
          >
            <span>Clip</span>
            <span style={{ color: "#a78bfa" }}>Koala</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {input.eyebrow ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#a0a0b6",
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: input.accent ?? "#8b5cf6",
                  }}
                />
                {input.eyebrow}
              </div>
            ) : null}
            <div
              style={{
                fontFamily: "Nunito",
                fontWeight: 900,
                fontSize: titleSize,
                lineHeight: 1.05,
                letterSpacing: -1.5,
              }}
            >
              {input.title}
            </div>
            {input.subtitle ? (
              <div
                style={{
                  fontSize: 26,
                  lineHeight: 1.35,
                  color: "#c8c8d8",
                }}
              >
                {input.subtitle}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#a0a0b6",
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PLATFORMS.map((p) => (
                <div
                  key={p}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: 18,
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 22, fontWeight: 500 }}>{SITE.domain}</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 400,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mascot} width={380} height={380} alt="" />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Nunito", data: extra, weight: 800, style: "normal" },
        { name: "Nunito", data: black, weight: 900, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    }
  );
}
