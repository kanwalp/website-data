# supportstrings

Canonical, public, curated content for the SupportStrings website. This folder is the **single authored source**; the website repository keeps only a generated, gitignored copy.

| File | Content |
| --- | --- |
| `categories.json` | Category and subcategory taxonomy |
| `ideas.json` | Curated business ideas |
| `workflows.json` | Reusable workflow templates |
| `workflow-content.json` | Idea-specific workflow content profiles |
| `filters.json` | Discovery filter definitions |
| `guides.json` | Editorial guides |
| `guided-execution.json` | Phase 7.5 guided experience: experience archetypes, per-workflow task overlays (keyed by stable step, checklist and decision-gate IDs) and per-idea 60-Second Starter trailers |

`manifest.json` lists the files and their schema versions. `schemaVersion` is the dataset layout version; `fileSchemaVersions` records each file's own `schemaVersion`.

## Rules

- Public curated content only. No credentials, user data, notes, progress or calculator inputs (those belong to the app: localStorage today, Supabase from Phase 8).
- IDs, slugs, workflow IDs, step IDs, checklist item IDs and decision-gate IDs are stable. Visitors' saved guest workspaces refer to them (guided tasks are keyed by them too), so never rename or reuse one.
- The website consumes this at **build time** (`scripts/sync-website-data.mjs` in `support-strings-website`). Visitors never fetch it.
- The website owns the validation schema (`npm run validate:data` there). Run it against your change before merging: `WEBSITE_DATA_LOCAL_PATH=<this repo> npm run sync:data`.
- Update `manifest.json` (`contentVersion`, `updatedAt`, and `fileSchemaVersions` if a file's schema changes) with every content change.
