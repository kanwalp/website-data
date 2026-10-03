import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const today = new Date();
console.log(`TechVodka data ${manifest.dataVersion}`);
for (const f of manifest.files.filter(x => x.type === "electricity-tariff")) {
  let status = f.verificationStatus ?? "UNKNOWN";
  if (f.effectiveTo) {
    const expiry = new Date(`${f.effectiveTo}T23:59:59Z`);
    if (expiry < today) status = "EXPIRED";
  }
  console.log(`${String(f.stateCode).padEnd(3)} ${String(status).padEnd(42)} enabled=${f.productionEnabled}`);
}
