# Opportunity Scout AI

Professional MVP for an AI-assisted public-source investment research platform. It includes a Next.js + TypeScript + Tailwind app.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Vercel

The project is configured as a Next.js deployment in `vercel.json`.

## Current MVP

- Investor questionnaire with default USD 3,000,000 mandate
- User-submitted mandate flow before public-source discovery
- Search category configuration
- Demo-only opportunity discovery for Lebanon
- Duplicate/risk-aware ranking model
- Opportunity detail review with verification warnings
- Market projection chart, sensitivity heat map, and risk matrix
- Analysis checkpoint for defensible market size, competitive picture, real prices, and readable charts
- PDF report control placeholder
- Consent-gated Resend email endpoint with demo preview fallback

The intended production flow is: investor fills the questionnaire, confirms legal authority, submits the mandate, then server-side jobs run compliant public-source scraping/search, source snapshots, duplicate checks, AI-assisted analysis, chart generation, ranking, and report generation.

Before a report is considered ready, the analysis must include a defensible market-size range, competitor evidence, real pricing data where available, and at least two readable charts with cited source support.

All sample opportunities are marked `DEMO DATA`. The app does not invest, transfer funds, contact sellers, guarantee returns, or scrape prohibited sources. Real email requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, a recipient email, and explicit user consent.

## Email setup

```bash
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL="Opportunity Scout AI <reports@verified-domain.com>"
```

## Python chart script

Generate market-analysis charts from a CSV:

```bash
python -m pip install -r scripts/requirements.txt
python scripts/opportunity_market_charts.py --input data/demo_market_data.csv --output reports/charts
```

The script creates:

- `market_size_range.png`
- `competitor_price_map.png`
- `ranking_return_scenarios.png`
- `analysis_summary.csv`
