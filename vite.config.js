import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const DEFAULT_COMPANY_NAME = "Midsouth Healthcare Management";
const DEFAULT_SITE_DESCRIPTION =
  "Healthcare management consulting for physician practices, including practice management, revenue cycle, credentialing, IT, and back-office support.";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "/";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

function getSiteMetadata(env) {
  return {
    companyName: env.VITE_COMPANY_NAME || DEFAULT_COMPANY_NAME,
    siteDescription: env.VITE_SITE_DESCRIPTION || DEFAULT_SITE_DESCRIPTION,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function htmlMetadataPlugin(siteMetadata) {
  return {
    name: "html-site-metadata",
    transformIndexHtml(html) {
      return html
        .replaceAll("__COMPANY_NAME__", escapeHtml(siteMetadata.companyName))
        .replaceAll("__SITE_DESCRIPTION__", escapeHtml(siteMetadata.siteDescription));
    },
  };
}

function siteManifestPlugin(siteMetadata) {
  return {
    name: "site-webmanifest",
    generateBundle() {
      const words = siteMetadata.companyName.split(/\s+/).filter(Boolean);
      const shortName = words.length > 1 ? words.slice(0, 2).join(" ") : siteMetadata.companyName;
      const manifest = {
        name: siteMetadata.companyName,
        short_name: shortName.slice(0, 24),
        description: siteMetadata.siteDescription,
        start_url: ".",
        display: "standalone",
        background_color: "#f7fbfa",
        theme_color: "#0f7a6c",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      };

      this.emitFile({
        type: "asset",
        fileName: "site.webmanifest",
        source: `${JSON.stringify(manifest, null, 2)}\n`,
      });
    },
  };
}

function wrapWords(value, maxCharsPerLine, maxLines) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";
  let index = 0;

  while (index < words.length && lines.length < maxLines) {
    const candidate = currentLine ? `${currentLine} ${words[index]}` : words[index];

    if (!currentLine || candidate.length <= maxCharsPerLine || lines.length === maxLines - 1) {
      currentLine = candidate;
      index += 1;
      continue;
    }

    lines.push(currentLine);
    currentLine = "";
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, maxLines);
}

function brandAssetPlugin(siteMetadata) {
  return {
    name: "brand-assets",
    generateBundle() {
      const companyName = escapeHtml(siteMetadata.companyName);
      const companyInitial = escapeHtml(siteMetadata.companyName.trim().charAt(0).toUpperCase() || "M");
      const description = escapeHtml(siteMetadata.siteDescription);
      const titleLines = wrapWords(siteMetadata.companyName, 18, 2);
      const ogTitle = titleLines
        .map(
          (line, index) =>
            `<text x="150" y="${420 + index * 70}" font-family="Nunito, Arial, sans-serif" font-size="64" font-weight="800">${escapeHtml(line)}</text>`,
        )
        .join("");

      const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title">
  <title>${companyName}</title>
  <rect width="64" height="64" rx="16" fill="#0f7a6c" />
  <text x="32" y="39" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="28" font-weight="800" fill="#f7fbfa">${companyInitial}</text>
</svg>
`;

      const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${companyName}</title>
  <desc id="desc">${description}</desc>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f4fbf8" />
      <stop offset="100%" stop-color="#d8f1ea" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect x="72" y="72" width="1056" height="486" rx="36" fill="#0f7a6c" />
  <g fill="#f7fbfa">
    <circle cx="186" cy="208" r="58" opacity="0.18" />
    <text x="186" y="224" text-anchor="middle" font-family="Nunito, Arial, sans-serif" font-size="54" font-weight="800">${companyInitial}</text>
    ${ogTitle}
    <text x="150" y="548" font-family="Nunito, Arial, sans-serif" font-size="32" font-weight="600" opacity="0.9">${description}</text>
  </g>
</svg>
`;

      this.emitFile({
        type: "asset",
        fileName: "favicon.svg",
        source: faviconSvg,
      });

      this.emitFile({
        type: "asset",
        fileName: "og-image.svg",
        source: ogImageSvg,
      });
    },
  };
}

function spaFallbackPlugin() {
  const rootDir = fileURLToPath(new URL(".", import.meta.url));

  return {
    name: "spa-fallback-file",
    closeBundle() {
      const distDir = resolve(rootDir, "dist");
      const indexFile = resolve(distDir, "index.html");
      const fallbackFile = resolve(distDir, "404.html");

      if (existsSync(indexFile)) {
        copyFileSync(indexFile, fallbackFile);
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteMetadata = getSiteMetadata(env);

  return {
    base: normalizeBasePath(env.VITE_APP_BASE),
    plugins: [
      react(),
      htmlMetadataPlugin(siteMetadata),
      siteManifestPlugin(siteMetadata),
      brandAssetPlugin(siteMetadata),
      spaFallbackPlugin(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: true,
      port: 5173,
    },
    preview: {
      host: true,
      port: 4173,
    },
  };
});
