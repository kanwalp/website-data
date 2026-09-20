# TechVodka Data

Public, versioned data used by **TechVodka — Calculate → Compare → Understand → Decide**.

## Current Phase-1 coverage

- Electricity: Telangana, Andhra Pradesh, Karnataka, Maharashtra, Kerala, Tamil Nadu, Delhi
- Solar: PM Surya Ghar central CFA, official rooftop-solar guidance, Delhi state solar incentives
- EV: central charging-infrastructure policy and selected current manufacturer battery/range specifications
- Appliances: current BEE Standards & Labelling policy metadata

## Safety rule

A missing or `null` value is intentional. Never replace it with a guessed value. Dynamic values such as fuel prices, EV purchase prices, public-charger retail prices, solar installer prices and monthly electricity adjustments should come from a user input or a separately verified, date-stamped feed.

## Verification statuses

- `VERIFIED_OFFICIAL`: directly verified against an official source.
- `VERIFIED_CURRENT_ORDER_RATES_CROSSCHECKED`: current regulator order is listed and rates were cross-checked with an official current DISCOM filing / prior corrected order.
- `VERIFIED_BASE_DYNAMIC_PARTIAL`: base tariff is verified but current dynamic components are incomplete.
- `PARTIAL_DIRECT_FY2026_27_SOURCE_PENDING`: data is present for reference but production calculation is deliberately disabled.

## Validate

```bash
npm run validate
npm run status
```

## Website integration

TechVodka should download this repository at **build time** and copy verified data into `public/data/v1`. Website visitors should never depend on GitHub at runtime.

See [DEPLOYMENT.md](DEPLOYMENT.md).
