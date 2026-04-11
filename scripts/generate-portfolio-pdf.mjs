#!/usr/bin/env node
/**
 * Renders public/pdf/HEPL_Portfolio.html (served from ./public) to public/pdf/highbrou.pdf
 * using Playwright so /Images and S3 assets resolve like production.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicRoot = path.resolve(__dirname, "..", "public");
const outPdf = path.join(publicRoot, "pdf", "highbrou.pdf");

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    ".html": "text/html; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
  };
  return map[ext] || "application/octet-stream";
}

function handle(req, res) {
  try {
    const raw = decodeURIComponent((req.url || "/").split("?")[0]);
    let rel = raw.replace(/^\/+/, "");
    if (!rel || rel === "") {
      res.writeHead(302, { Location: "/pdf/HEPL_Portfolio.html" });
      return res.end();
    }
    const abs = path.normalize(path.join(publicRoot, rel));
    if (!abs.startsWith(publicRoot)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.setHeader("Content-Type", mimeFor(abs));
    fs.createReadStream(abs).pipe(res);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
}

const server = http.createServer(handle);

await new Promise((resolve, reject) => {
  server.listen(0, "127.0.0.1", (err) => (err ? reject(err) : resolve()));
});

const { port } = server.address();
const url = `http://127.0.0.1:${port}/pdf/HEPL_Portfolio.html`;
console.log("Portfolio URL:", url);

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 180000 });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());

  await page.pdf({
    path: outPdf,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  console.log("Wrote", outPdf);
} finally {
  await browser?.close();
  await new Promise((r) => server.close(r));
}
