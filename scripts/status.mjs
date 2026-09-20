import fs from "node:fs";
const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
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
