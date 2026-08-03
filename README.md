<img src="./readme/card-titles/title1.svg"/>
<br>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details when a license file is added.

<br><br>
<!-- project overview -->
<img src="./readme/card-titles/title2.svg"/>

> Opportunity Scout AI is a professional MVP for AI-assisted public-source investment research, built around investor mandate capture, compliant discovery, ranking, and report preparation.<br>
> The platform helps investors organize opportunity discovery without making investments, transferring funds, contacting sellers, guaranteeing returns, or scraping prohibited sources.

<br>
<!-- System Design -->
<img src="./readme/card-titles/title3.svg"/>

### Application Architecture

| Layer | Purpose |
|------|---------|
| **Next.js App** | Investor-facing mandate, dashboard, ranking, and report workflow |
| **TypeScript Domain Models** | Shared opportunity, investor profile, validation, and scoring types |
| **Demo Opportunity Engine** | Lebanon-focused sample opportunities marked clearly as `DEMO DATA` |
| **Ranking Model** | Weighted and risk-adjusted scoring for opportunity comparison |
| **Visualization Layer** | Market projection chart, sensitivity heat map, and risk matrix powered by Recharts |
| **Email Preview API** | Consent-gated report preview and Resend delivery fallback |

<br>

### Repository Map

| Path | Description |
|------|-------------|
| `app/page.tsx` | Main product UI, questionnaire, ranking dashboard, charts, and report controls |
| `app/api/email-preview` | Email preview / Resend workflow endpoint |
| `lib/opportunities.ts` | Demo opportunities, search categories, and score calculations |
| `lib/types.ts` | Investor profile and opportunity data types |
| `lib/validation.ts` | Input validation helpers |
| `vercel.json` | Next.js deployment configuration |

<br><br>
<!-- Project Highlights -->
<img src="./readme/card-titles/title4.svg"/>

### Core Features

- **Investor mandate questionnaire**: Captures investor profile, capital range, geography, industry targets, excluded sectors, risk tolerance, return goals, and legal authority.<br>
- **Public-source research workflow**: Models the intended production path for permitted search, source snapshots, duplicate checks, AI-assisted analysis, ranking, and report generation.<br>
- **Risk-aware opportunity ranking**: Scores demo opportunities by strategic fit, return profile, verification risk, and duplicate/listing quality.<br>
- **Decision-support visuals**: Includes market projections, sensitivity heat map, risk matrix, timeline, and opportunity detail review.<br>
- **Consent-gated communication**: Email preview and Resend delivery require an explicit user consent step before sending.<br>

<br>

### Compliance Guardrails

| Guardrail | Behavior |
|----------|----------|
| **No investment execution** | The app does not invest, transfer funds, or contact sellers |
| **No guaranteed returns** | Outputs are preliminary research support, not financial advice |
| **Public-source only** | Production flow is designed around permitted public information |
| **Verification warnings** | Demo opportunities include warnings for incomplete or uncertain claims |
| **Consent required** | Email/report workflow is gated before any outbound delivery |

<br>
<!-- Demo -->
<img src="./readme/card-titles/title5.svg"/>

### Quick Start

```bash
npm install
npm run dev
```

Open the app at:

```bash
http://localhost:3000
```

<br>

### Current MVP Flow

1. Investor fills the questionnaire and confirms legal authority.
2. User submits the mandate before discovery begins.
3. Demo Lebanon opportunities are ranked by risk-adjusted fit.
4. User reviews opportunity details, warnings, assumptions, and charts.
5. Report/email preview is generated only after consent.

<br>

### Email Setup

Real email delivery requires Resend configuration:

```bash
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL="Opportunity Scout AI <reports@verified-domain.com>"
```

Without these values, the app uses a demo preview fallback.

<br><br>
<!-- Development & Testing -->
<img src="./readme/card-titles/title6.svg"/>

### Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the production app |
| `npm run lint` | Run Next.js linting |

<br>

### Important Disclaimer

This platform provides automated preliminary research based on public information, user inputs, and stated assumptions. It does not provide financial, legal, tax, valuation, or investment advice. Listings and financial claims may be incomplete or inaccurate. Every opportunity requires independent verification and professional due diligence before funds are committed.

<br><br>
<!-- Extras -->
<img src="./readme/card-titles/title7.svg"/>

### Additional Tools & Services

| Tool | Purpose |
|------|---------|
| **Next.js** | App routing, rendering, API routes, and Vercel deployment target |
| **React** | Interactive investor workflow and dashboard UI |
| **TypeScript** | Type-safe product logic and data models |
| **Tailwind CSS** | Visual styling and responsive layout |
| **Recharts** | Projection, sensitivity, and risk visualizations |
| **Resend** | Consent-gated email delivery |
| **Supabase JS** | Future data/auth integration dependency |
| **Zod** | Validation for structured input handling |
| **React PDF** | Report-generation foundation |

<br>

---

**Opportunity Scout AI** - AI-assisted public-source investment research and opportunity ranking.

*Research support first, due diligence always.*
