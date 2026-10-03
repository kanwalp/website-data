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
└── supportstrings/     # reserved for the SupportStrings site
```

## Rules

- Public curated website data only.
- No credentials, secrets or tokens.
- No user-specific or personal data.
- Sites consume this data **at build time** (a build-time sync copies `<site>/` into the website's local generated data). Visitors never depend on this repository at runtime.
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

[`supportstrings/`](supportstrings/README.md) is reserved. Its manifest and schema will be defined by that site.
