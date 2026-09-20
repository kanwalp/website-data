# Schema Notes

The repository intentionally uses flexible JSON rather than one rigid India-wide tariff schema. Each electricity file declares a `calculationEngine`, and the website dispatches to the matching calculation function.

Supported Phase-1 engines:

- `TELANGANA_LT1_BANDED`
- `AP_TELESCOPIC`
- `KARNATAKA_FLAT_RATE`
- `MAHARASHTRA_TELESCOPIC_WHEELING`
- `KERALA_LT1_HYBRID`
- `TAMIL_NADU_BIMONTHLY`
- `DELHI_TELESCOPIC`
- `CUSTOM_RATE` (website fallback)

All production datasets should include `schemaVersion`, `dataVersion`, `verifiedOn`, `verificationStatus`, `productionEnabled` and `sourceKeys`.
