# Data Maintenance Rules

1. **Use official sources first.** Regulator, ministry, government portal or manufacturer source.
2. **Never guess missing values.** Use `null`, disable production, or require user input.
3. **Date dynamic data.** FPPAS/FSA/FCA, fuel prices, subsidies and operator pricing must have validity dates.
4. **Do not confuse a government benchmark with a market price.**
5. **Do not treat certified EV range as real-world efficiency.**
6. **Do not calculate Tamil Nadu final consumer bills until the current direct FY2026-27 subsidy source is verified.**
7. **Delhi FPPAS is only applied when DISCOM and validity dates both match.**
8. **Kerala switches from telescopic billing to non-telescopic total-consumption bands above 250 units/month.**
9. **Telangana first selects the domestic tariff band from total monthly consumption, then applies that band's slabs.**
10. Run `npm run validate` before every commit.
