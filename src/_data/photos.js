const fs = require("fs");
const path = require("path");

const PHOTOS_DIR = path.join(__dirname, "..", "photos");
// The list of existing photos is driven off the thumbs/ folder, since every
// photo must have a thumbnail generated for the gallery to show it, and
// thumbnails are small enough to always be present in the repo.
const SCAN_DIR = path.join(PHOTOS_DIR, "thumbs");
const OVERRIDES_PATH = path.join(__dirname, "photo-dates.json");

// Try to guess a date from common filename patterns.
// Returns { date: "YYYY-MM-DD", guessed: true } or null if nothing matched.
function guessDateFromFilename(name) {
  // e.g. 20250309_104603.jpg -> 2025-03-09
  let m = name.match(/^(\d{4})(\d{2})(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;

  // e.g. IMG-20250722-WA0008.jpg (WhatsApp - date the photo was received, not necessarily taken)
  m = name.match(/^IMG-(\d{4})(\d{2})(\d{2})-WA/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;

  return null;
}

function loadOverrides() {
  try {
    return JSON.parse(fs.readFileSync(OVERRIDES_PATH, "utf8"));
  } catch (e) {
    return {};
  }
}

function scanType(type, overrides) {
  const typeDir = path.join(SCAN_DIR, type);
  if (!fs.existsSync(typeDir)) return [];

  const years = fs
    .readdirSync(typeDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const images = [];
  for (const year of years) {
    const yearDir = path.join(typeDir, year);
    const files = fs
      .readdirSync(yearDir)
      .filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith("."));

    for (const name of files) {
      let date = overrides[name];
      let dateSource = "manual";

      if (!date) {
        date = guessDateFromFilename(name);
        dateSource = date ? "filename-guess" : null;
      }

      if (!date) {
        date = `${year}-01-01`;
        dateSource = "needs-review";
      }

      images.push({ name, year: Number(year), date, dateSource });
    }
  }

  images.sort((a, b) => new Date(b.date) - new Date(a.date));
  return images;
}

module.exports = function () {
  const overrides = loadOverrides();
  return {
    digital: scanType("digital", overrides),
    film: scanType("film", overrides),
  };
};
