import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PassThrough } from "stream";
import { ZipArchive } from "archiver";
import {
  isAllowedMediaUrl,
  REFERERS,
  sanitizeFilename,
} from "@/lib/proxy-hosts";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_ITEMS = 12;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

interface ZipItem {
  url: string;
  /** File name inside the archive (extension included), sanitized here */
  name: string;
}

// Bundles a carousel/slideshow into one ZIP. Media is already compressed,
// so entries are stored rather than re-deflated.
export async function POST(req: NextRequest) {
  let body: { items?: ZipItem[]; platform?: string; title?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const platform =
    typeof body.platform === "string" ? body.platform : "media";
  const items = Array.isArray(body.items) ? body.items.slice(0, MAX_ITEMS) : [];

  if (items.length < 2) {
    return NextResponse.json(
      { error: "A ZIP needs at least two files" },
      { status: 400 }
    );
  }
  for (const item of items) {
    if (typeof item?.url !== "string" || !isAllowedMediaUrl(item.url)) {
      return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
    }
  }

  const referer = REFERERS[platform] ?? "https://www.tiktok.com/";
  const zipName = `${sanitizeFilename(body.title ?? "", `${platform}-bundle`)}.zip`;

  const archive = new ZipArchive({ store: true });
  const out = new PassThrough();
  archive.pipe(out);

  // Fetch sequentially and append  keeps memory flat and ordering stable.
  const fill = async () => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const entryName = sanitizeFilename(
        item.name?.replace(/\.[a-z0-9]+$/i, "") ?? "",
        `file-${i + 1}`
      );
      const extMatch = item.name?.match(/\.([a-z0-9]{2,4})$/i);
      const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
      try {
        const res = await axios.get(item.url, {
          responseType: "stream",
          timeout: 30000,
          headers: { "User-Agent": UA, Referer: referer },
        });
        archive.append(res.data, { name: `${entryName}.${ext}` });
        // Wait for this entry to finish before starting the next fetch
        await new Promise<void>((resolve, reject) => {
          const onEntry = () => {
            archive.off("error", onErr);
            resolve();
          };
          const onErr = (e: Error) => {
            archive.off("entry", onEntry);
            reject(e);
          };
          archive.once("entry", onEntry);
          archive.once("error", onErr);
        });
      } catch {
        // Skip files that fail  an incomplete bundle beats a dead download
        archive.append(`Could not fetch: ${item.url}\n`, {
          name: `${entryName}.SKIPPED.txt`,
        });
      }
    }
    await archive.finalize();
  };
  fill().catch((e) => {
    console.error("[/api/zip] Error:", e instanceof Error ? e.message : e);
    out.destroy(e instanceof Error ? e : new Error("zip failed"));
  });

  const webStream = new ReadableStream({
    start(controller) {
      out.on("data", (chunk: Buffer) => controller.enqueue(chunk));
      out.on("end", () => controller.close());
      out.on("error", (err) => controller.error(err));
    },
  });

  // eslint-disable-next-line no-control-regex
  const asciiZipName =
    zipName.replace(/[^\x20-\x7e]/g, "").replace(/"/g, "").trim() ||
    `${platform}-bundle.zip`;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${asciiZipName}"; filename*=UTF-8''${encodeURIComponent(zipName)}`,
      "Cache-Control": "no-store",
    },
  });
}
