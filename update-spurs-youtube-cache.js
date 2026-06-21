const fs = require("fs/promises");
const path = require("path");

const outputPath = path.join(__dirname, "spurs-youtube-data.js");
const sources = [
  { name: "Last Word On Spurs", id: "UCbqK092y4W290g_C3tuKEbg" },
  { name: "Harry Hotspur", id: "UCObGvDVuclUn12bjpaylunw" },
  { name: "SpotliteOnSpurs", id: "UCiexKnvpyZ0E__UA5AEsMug" },
  { name: "DANalyst", id: "UC-tsZO1o5wAnUeFTZLN2GJQ" },
  { name: "The Two Marks Show", id: "UCPqoU9jKmCbcSEvoxCTXJXw" },
  { name: "Rule the Roost", id: "UCLR1P3I2mBtV_QfPL0ppx-w" },
];

function decode(value = "") {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
  return match ? decode(match[1]) : "";
}

function readFeed(xml, source) {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/gi) || [];

  return entries.slice(0, 2).map((entry) => {
    const link = entry.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] || "";
    const published = tag(entry, "published") || tag(entry, "updated");
    const date = published ? new Date(published) : new Date(0);

    return {
      source: source.name,
      group: "YouTube",
      title: tag(entry, "title"),
      description: tag(entry, "media:description"),
      link,
      timestamp: Number.isNaN(date.getTime()) ? 0 : date.getTime(),
    };
  }).filter((item) => item.title && item.link);
}

async function fetchSource(source) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${source.id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${source.name}: HTTP ${response.status}`);
  return readFeed(await response.text(), source);
}

async function main() {
  const settled = await Promise.allSettled(sources.map(fetchSource));
  const results = settled
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  if (!results.length) {
    throw new Error("No YouTube feeds responded. Keeping the existing cache unchanged.");
  }

  const items = [];

  for (let round = 0; round < 2; round += 1) {
    results.forEach((sourceItems) => {
      if (sourceItems[round]) items.push(sourceItems[round]);
    });
  }

  const cache = { updatedAt: new Date().toISOString(), items };
  await fs.writeFile(
    outputPath,
    `window.SPURS_YOUTUBE_CACHE = ${JSON.stringify(cache, null, 2)};\n`,
    "utf8",
  );
  console.log(`Wrote spurs-youtube-data.js with ${items.length} videos from ${results.length} channels.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
