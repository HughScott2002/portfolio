import { readFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";

type PreviewImage = {
  /** Path inside public/, e.g. "/og.png". */
  path: string;
  /** Alt text. Required for accessibility and for the no-image fallback. */
  alt: string;
};

type PreviewConfig = {
  /** Canonical site URL. Every preview URL is built from this. */
  url: string;
  /** Shown as og:site_name. */
  siteName: string;
  /** Browser tab title. Falls back to the existing <title> when omitted. */
  pageTitle?: string;
  /** The headline. Used for og:title, twitter:title and the meta description source. */
  title: string;
  /** The supporting line. Used for og:description, twitter:description and meta description. */
  description: string;
  /** One or more preview images. The first is the primary one. */
  images: PreviewImage[];
};

type SiteConfig = { preview?: PreviewConfig };

const JPEG_SOF_MARKERS = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

/** Reads the real pixel dimensions of a PNG or JPEG so the tags never lie. */
function readImageSize(file: Buffer): { width: number; height: number } | null {
  if (file.length > 24 && file.toString("ascii", 1, 4) === "PNG") {
    return { width: file.readUInt32BE(16), height: file.readUInt32BE(20) };
  }

  if (file.length > 4 && file[0] === 0xff && file[1] === 0xd8) {
    let offset = 2;
    while (offset < file.length - 9) {
      if (file[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = file[offset + 1];
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const size = file.readUInt16BE(offset + 2);
      if (JPEG_SOF_MARKERS.has(marker)) {
        return { height: file.readUInt16BE(offset + 5), width: file.readUInt16BE(offset + 7) };
      }
      offset += 2 + size;
    }
  }

  return null;
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function metaTag(attribute: "property" | "name", key: string, content: string): string {
  return `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`;
}

/**
 * Injects the link preview tags from config.json so the copy and the image live in one place.
 * Existing tags are stripped first, so the HTML can never drift from the config.
 */
function siteMetaPlugin(): Plugin {
  let root = process.cwd();
  let preview: PreviewConfig | undefined;

  function readPreview() {
    const site = JSON.parse(readFileSync(join(root, "config.json"), "utf8")) as SiteConfig;
    preview = site.preview;
  }

  return {
    name: "site-meta",
    configResolved(config) {
      root = config.root;
      readPreview();
    },
    handleHotUpdate(context) {
      if (!context.file.endsWith("config.json")) return;
      readPreview();
      // The preview tags are baked into the HTML shell, so the page has to reload.
      context.server.ws.send({ type: "full-reload" });
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (!preview) return html;

        const siteUrl = preview.url.endsWith("/") ? preview.url : `${preview.url}/`;
        const imageUrl = (path: string) => new URL(path.replace(/^\//, ""), siteUrl).href;

        const tags: string[] = [
          metaTag("name", "description", preview.description),
          metaTag("property", "og:type", "website"),
          metaTag("property", "og:url", siteUrl),
          metaTag("property", "og:site_name", preview.siteName),
          metaTag("property", "og:title", preview.title),
          metaTag("property", "og:description", preview.description),
        ];

        for (const image of preview.images) {
          const file = readFileSync(join(root, "public", image.path.replace(/^\//, "")));
          const size = readImageSize(file);
          const type = file.toString("ascii", 1, 4) === "PNG" ? "image/png" : "image/jpeg";
          tags.push(metaTag("property", "og:image", imageUrl(image.path)));
          if (size) {
            tags.push(metaTag("property", "og:image:width", String(size.width)));
            tags.push(metaTag("property", "og:image:height", String(size.height)));
          }
          tags.push(metaTag("property", "og:image:type", type));
          tags.push(metaTag("property", "og:image:alt", image.alt));
        }

        const primary = preview.images[0];
        tags.push(metaTag("name", "twitter:card", "summary_large_image"));
        tags.push(metaTag("name", "twitter:title", preview.title));
        tags.push(metaTag("name", "twitter:description", preview.description));
        if (primary) {
          tags.push(metaTag("name", "twitter:image", imageUrl(primary.path)));
        }

        const stripped = html.replace(/<meta\b[^>]*>/g, (tag) => {
          if (/property="og:/i.test(tag)) return "";
          if (/name="twitter:/i.test(tag)) return "";
          if (/name="description"/i.test(tag)) return "";
          return tag;
        });

        const pageTitle = preview.pageTitle
          ? `<title>${escapeAttribute(preview.pageTitle)}</title>`
          : "";
        const withTitle = pageTitle
          ? stripped.replace(/<title>[\s\S]*?<\/title>/, pageTitle)
          : stripped;

        return withTitle.replace("</head>", `  ${tags.join("\n  ")}\n</head>`);
      },
    },
  };
}

export default defineConfig({
  plugins: [siteMetaPlugin()],
});
