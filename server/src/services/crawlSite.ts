import Site from "../models/sites.model";
import Page from "../models/page.model";
import axios from "axios";
import * as cheerio from "cheerio";

////////////////////////////////////////////////////////////

export const crawlSite = async (siteId: string) => {
  const site = await Site.findById(siteId);
  if (!site) throw new Error("Site not found");

  console.log("🚀 Starting crawl:", site.url);

  const BASE = normalize(site.url);
  const BASE_HOST = getHost(BASE);

  const queue: string[] = [BASE];
  const visited = new Set<string>();
  const pageLimit = 40;

  ////////////////////////////////////////////////////////////

  while (queue.length && visited.size < pageLimit) {
    const current = queue.shift()!;
    const normalizedCurrent = normalize(current);

    if (visited.has(normalizedCurrent)) continue;

    // 🔒 HARD DOMAIN GATE
    if (!isValid(normalizedCurrent, BASE_HOST)) {
      console.log("⛔ blocked:", normalizedCurrent);
      continue;
    }

    visited.add(normalizedCurrent);

    try {
      const res = await axios.get(normalizedCurrent, {
        timeout: 10000,
        validateStatus: () => true,
        headers: {
          "User-Agent": "CrawlerBot/1.0",
        },
      });

      if (res.status !== 200) {
        console.log("⚠ skipped status:", res.status);
        continue;
      }

      const $ = cheerio.load(res.data);

      $("script,style,nav,footer,header,iframe,noscript").remove();

      const title = $("title").text().trim() || "No title";
      const content = cleanText($("body").text());
      const description =
        $('meta[name="description"]').attr("content") || "";

      await Page.create({
        siteId: site._id,
        url: normalizedCurrent,
        title,
        content,
      
      });

      console.log("✅ Crawled:", normalizedCurrent);

      ////////////////////////////////////////////////////////
      // LINK EXTRACTION
      ////////////////////////////////////////////////////////

      $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if (!href) return;

        const resolved = resolve(href, normalizedCurrent);
        if (!resolved) return;

        const normalized = normalize(resolved);

        if (
          !visited.has(normalized) &&
          !queue.includes(normalized) &&
          isValid(normalized, BASE_HOST)
        ) {
          queue.push(normalized);
          console.log("   ↳ queued:", normalized);
        }
      });

    } catch (err) {
      console.log("❌ fetch failed:", normalizedCurrent);
    }
  }

  console.log(
    `🎉 Crawl complete — ${visited.size} pages indexed for ${site.url}`
  );
};

////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

function normalize(url: string): string {
  try {
    const u = new URL(url);

    u.hash = "";

    let s = u.origin + u.pathname.replace(/\/$/, "");
    if (!s.endsWith("/")) s += "";

    return s;
  } catch {
    return url;
  }
}

function resolve(href: string, base: string): string | null {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

function getHost(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 10000);
}

////////////////////////////////////////////////////////////
// STRICT DOMAIN + JUNK FILTER
////////////////////////////////////////////////////////////

function isValid(url: string, baseHost: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    // ✅ strict same-site rule
    if (host !== baseHost) return false;

    // 🚫 junk filters
    const junk = [
      "javascript:",
      "mailto:",
      "tel:",
      "wp-admin",
      "wp-login",
      "wp-json",
      "cdn-cgi",
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".svg",
      ".pdf",
      ".zip",
      "#",
    ];

    return !junk.some(j => url.includes(j));

  } catch {
    return false;
  }
}
