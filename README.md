# website-data

Shared, public, curated data for multiple websites. Each website owns its own folder, schema and manifest.

```text
website-data/
├── README.md
├── techvodka/          # TechVodka calculators (manifest.json + data files)
│   ├── manifest.json
│   ├── electricity/  solar/  ev/  appliances/
│   ├── sources.json  dynamic-inputs.json
│   └── scripts/        # validation for this folder
└── supportstrings/     # SupportStrings (manifest.json + categories, ideas, workflows, filters, guides)
```

## Rules

- Public curated website data only: content that is authored, reviewed and versioned like code.
- No credentials, secrets or tokens.
- No user-specific or personal data. Runtime/user data (accounts, progress, notes, calculator inputs) never belongs here.
- Sites consume this data **at build time** (a build-time sync copies `<site>/` into the website's local generated data). Visitors never depend on this repository at runtime.
- Every site folder has a `manifest.json` (site, schema version, content version, update date, file list).
- Each site owns its validation schema; validation lives in that site's repository (or its own folder), not shared.
- Each site owns its schema and `manifest.json`; changing one site's schema must not require changing another's.
- A missing or `null` value is intentional. Never replace it with a guessed value.

## TechVodka

Data lives in [`techvodka/`](techvodka/manifest.json). Maintenance rules: [`techvodka/DATA_MAINTENANCE.md`](techvodka/DATA_MAINTENANCE.md). Schema notes: [`techvodka/SCHEMA.md`](techvodka/SCHEMA.md). Website integration notes: [`techvodka/DEPLOYMENT.md`](techvodka/DEPLOYMENT.md).

Current Phase-1 coverage: electricity tariffs (TG, AP, KA, MH, KL, TN, DL), PM Surya Ghar and Delhi solar policy, EV charging policy and manufacturer specs, BEE appliance policy metadata.

Verification statuses:

- `VERIFIED_OFFICIAL`: directly verified against an official source.
- `VERIFIED_CURRENT_ORDER_RATES_CROSSCHECKED`: current regulator order listed and rates cross-checked with an official DISCOM filing / prior corrected order.
- `VERIFIED_BASE_DYNAMIC_PARTIAL`: base tariff verified but current dynamic components incomplete.
- `PARTIAL_DIRECT_FY2026_27_SOURCE_PENDING`: present for reference; production calculation deliberately disabled.

Validate:

```bash
npm run validate
npm run status
```

## SupportStrings

[`supportstrings/`](supportstrings/README.md) holds the curated catalogue for supportstrings.com: categories, business ideas, workflow templates and content profiles, filters and guides, described by [`manifest.json`](supportstrings/manifest.json). The website syncs it at build time (`WEBSITE_DATA_LOCAL_PATH` locally, this repo at `WEBSITE_DATA_REF` otherwise) and validates it with `npm run validate:data` in the `support-strings-website` repo. IDs, slugs, workflow IDs and step IDs are stable because returning visitors' saved guest workspaces refer to them.

This content stays here long-term; SupportStrings' future Supabase backend (Phase 8) stores only user/runtime data.
