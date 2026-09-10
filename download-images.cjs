const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");

const pagesJson = fs.readFileSync("src/data/pages.json", "utf8");
const regex = /https:\/\/mhmconsultants\.net\/[^"]+/g;
const allMatches = [...pagesJson.matchAll(regex)].map(m => m[0]);
const unique = [...new Set(allMatches)];
console.log("Found " + unique.length + " unique image URLs");

const outputDir = "public/images";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", err => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  let updated = pagesJson;
  let success = 0, fail = 0;

  for (const url of unique) {
    const filename = path.basename(url.split("?")[0]);
    const dest = path.join(outputDir, filename);
    const localPath = "/images/" + filename;
    try {
      if (!fs.existsSync(dest)) {
        await download(url, dest);
        console.log("OK: " + filename);
      } else {
        console.log("EXISTS: " + filename);
      }
      updated = updated.split(url).join(localPath);
      success++;
    } catch(e) {
      console.log("FAIL: " + url + " -> " + e.message);
      fail++;
    }
  }

  fs.writeFileSync("src/data/pages.json", updated);
  console.log("\nDone! Success: " + success + " | Failed: " + fail);
  console.log("pages.json updated with local paths.");
}

run();
