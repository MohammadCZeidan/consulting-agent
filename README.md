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
- PDF report control placeholder
- Consent-gated Resend email endpoint with demo preview fallback

The intended production flow is: investor fills the questionnaire, confirms legal authority, submits the mandate, then server-side jobs run compliant public-source scraping/search, source snapshots, duplicate checks, AI-assisted analysis, ranking, and report generation.

All sample opportunities are marked `DEMO DATA`. The app does not invest, transfer funds, contact sellers, guarantee returns, or scrape prohibited sources. Real email requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, a recipient email, and explicit user consent.

## Email setup

```bash
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL="Opportunity Scout AI <reports@verified-domain.com>"
```
