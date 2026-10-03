# Using this data in the TechVodka website

TechVodka consumes `techvodka/` from this repository **at build time only**. The website repository's `scripts/sync-website-data.mjs` reads this folder (from a local checkout via `WEBSITE_DATA_LOCAL_PATH`, or from `github.com/kanwalp/website-data` at `WEBSITE_DATA_REF`, default `main`), validates `manifest.json`, and generates the local copy that the static Next.js export bundles. There is no browser-time dependency on GitHub.

Publishing a change:

1. Edit data under `techvodka/` and update `techvodka/manifest.json` (`dataVersion`/`contentVersion`, `updatedAt`, per-file records).
2. `npm run validate && npm run status`.
3. Merge to `main`. The website picks it up on its next build (or pin a tag/commit with `WEBSITE_DATA_REF`).
