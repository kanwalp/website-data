# Deploying `techvodka-data`

## Recommended: GitHub Pages

1. Create a new **public** GitHub repository named `techvodka-data`.
2. Copy the contents of this folder into the repository root.
3. From the folder run:

```bash
git init
git add .
git commit -m "Initial TechVodka Phase-1 data"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/techvodka-data.git
git push -u origin main
```

4. In GitHub open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/(root)`, then Save.
7. Wait for Pages to publish.
8. Verify these URLs in a browser:

```text
https://<YOUR_GITHUB_USERNAME>.github.io/techvodka-data/manifest.json
https://<YOUR_GITHUB_USERNAME>.github.io/techvodka-data/electricity/india/2026/TG.json
```

The repository contains `.nojekyll`, so GitHub Pages serves the files directly.

## Connect the TechVodka website

In the TechVodka website repository, set this locally in `.env.local`:

```text
TECHVODKA_DATA_BASE_URL=https://<YOUR_GITHUB_USERNAME>.github.io/techvodka-data
```

Also document the variable in `.env.example`, but do not commit `.env.local`.

Use your existing `scripts/sync-data.mjs` to download `manifest.json` and all files listed in it into:

```text
public/data/v1/
```

Then:

```bash
npm run data:sync
npm run data:status
npm run test
npm run build
```

The Next.js static build should copy the synchronized data into the generated `/out` directory. Upload the contents of `/out` to Hostinger `public_html`.

## Runtime architecture

```text
GitHub Pages techvodka-data
        ↓ build-time only
TechVodka /public/data/v1
        ↓ next build
TechVodka /out
        ↓
Hostinger CDN
        ↓
Browser
```

The browser should load `/data/v1/...` from `techvodka.com`, never from GitHub.

## Updating one tariff

1. Find the new official regulator/DISCOM source.
2. Update only the relevant state JSON.
3. Update `effectiveFrom`, `effectiveTo`, `verifiedOn`, `verificationStatus` and source metadata.
4. If the billing structure changed, bump `schemaVersion` only when the schema itself changed; otherwise bump `dataVersion`.
5. Update `manifest.json`.
6. Run:

```bash
npm run validate
npm run status
```

7. Commit and push.
8. Rebuild the TechVodka website so it snapshots the new data into Hostinger.

## Raw GitHub fallback

If you do not want GitHub Pages, build-time sync can use:

```text
https://raw.githubusercontent.com/<YOUR_GITHUB_USERNAME>/techvodka-data/main
```

GitHub Pages is preferred because it gives a simple stable HTTPS base URL and clean file paths.
