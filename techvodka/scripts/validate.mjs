import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "manifest.json");

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`Invalid JSON: ${path.relative(root, file)} - ${error.message}`);
    return null;
  }
}

const manifest = readJson(manifestPath);
if (!manifest) process.exit(1);
if (!manifest.schemaVersion || !manifest.dataVersion || !Array.isArray(manifest.files)) {
  fail("manifest.json is missing required fields");
}
if (manifest.site !== "techvodka") fail('manifest.json "site" must be "techvodka"');
if (!manifest.contentVersion) fail("manifest.json is missing contentVersion");
if (!/^\d{4}-\d{2}-\d{2}$/.test(manifest.updatedAt ?? "")) fail("manifest.json updatedAt must be YYYY-MM-DD");
const listed = manifest.files.map((item) => item.path);
if (new Set(listed).size !== listed.length) fail("manifest.json lists a duplicate file path");

const sourceRegistry = readJson(path.join(root, "sources.json"));
const sourceKeys = new Set(Object.keys(sourceRegistry?.sources ?? {}));

for (const item of manifest.files) {
  if (!item.path) {
    fail("Manifest item is missing path");
    continue;
  }
  const full = path.join(root, item.path);
  if (!fs.existsSync(full)) {
    fail(`Missing manifest file: ${item.path}`);
    continue;
  }
  const obj = readJson(full);
  if (!obj) continue;

  if (item.path !== "sources.json" && !obj.schemaVersion) {
    fail(`${item.path}: schemaVersion is required`);
  }
  if (item.path !== "sources.json" && !obj.dataVersion) {
    fail(`${item.path}: dataVersion is required`);
  }
  for (const key of obj.sourceKeys ?? []) {
    if (!sourceKeys.has(key)) fail(`${item.path}: unknown sourceKey ${key}`);
  }

  if (item.type === "electricity-tariff") {
    for (const field of ["stateCode", "stateName", "calculationEngine", "verificationStatus"]) {
      if (obj[field] === undefined || obj[field] === null || obj[field] === "") {
        fail(`${item.path}: missing ${field}`);
      }
    }
  }
}

if (!process.exitCode) {
  console.log(`OK: validated ${manifest.files.length} manifest files`);
  console.log(`Data version: ${manifest.dataVersion}`);
}
