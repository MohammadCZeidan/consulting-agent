"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Download,
  FileText,
  Filter,
  Gauge,
  Landmark,
  Lock,
  Mail,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { demoOpportunities, riskAdjustedScore, searchCategories, weightedScore } from "@/lib/opportunities";
import { InvestorProfile, Opportunity } from "@/lib/types";

const disclaimer =
  "This platform provides automated preliminary research based on public information, user inputs, and stated assumptions. It does not provide financial, legal, tax, valuation, or investment advice. Listings and financial claims may be incomplete or inaccurate. Every opportunity requires independent verification and professional due diligence before funds are committed.";

const initialProfile: InvestorProfile = {
  fullName: "Mohammad Zeidan",
  email: "investor@example.com",
  capital: 3000000,
  minInvestment: 250000,
  maxInvestment: 2400000,
  country: "Lebanon",
  locations: "Beirut, Metn, Bekaa",
  industries: ["Hotels and hospitality", "Warehouses and logistics", "Agriculture and food production"],
  excludedIndustries: "Gambling, weapons, adult businesses, unverifiable offers",
  role: "Passive",
  structure: "Acquisition or majority stake",
  riskTolerance: "balanced",
  minimumReturn: 10,
  maxPayback: 8,
  horizon: "5-7 years",
  financing: true,
  equityContribution: 65,
  currency: "USD",
  liquidity: "Moderate liquidity acceptable after year 3",
  esg: "No illegal, exploitative, or environmentally harmful activities",
  experience: "Real estate and operating-company oversight",
  notes: "Prioritize verified cash-flow opportunities in Lebanon.",
  legalConfirmation: true
};

const timeline = [
  ["Profile", "Investor mandate captured"],
  ["Sources", "Permitted public sources only"],
  ["Deduping", "Duplicate and expired listings flagged"],
  ["Analysis", "Market, financial, risk models drafted"],
  ["Report", "Email preview awaits consent"]
];

const projection = [
  { year: "Y1", downside: 3.5, base: 8.8, upside: 13.2 },
  { year: "Y2", downside: 4.2, base: 10.1, upside: 15.6 },
  { year: "Y3", downside: 4.8, base: 11.4, upside: 17.4 },
  { year: "Y4", downside: 5.3, base: 12.6, upside: 19.1 },
  { year: "Y5", downside: 5.8, base: 13.7, upside: 20.5 }
];

const heatMap = [
  [7, 9, 12, 15],
  [5, 8, 10, 13],
  [2, 5, 8, 11],
  [-1, 2, 5, 8]
];

export default function Home() {
  const [profile, setProfile] = useState(initialProfile);
  const [selectedId, setSelectedId] = useState(demoOpportunities[1].id);
  const [categoryFilter, setCategoryFilter] = useState("All selected");
  const [emailPreview, setEmailPreview] = useState<string | null>(null);
  const [emailConsent, setEmailConsent] = useState(false);
  const [researchQueued, setResearchQueued] = useState(false);

  const selected = demoOpportunities.find((item) => item.id === selectedId) ?? demoOpportunities[0];
  const filtered = useMemo(() => {
    return demoOpportunities
      .filter((item) => categoryFilter === "All selected" || item.sector === categoryFilter)
      .sort((a, b) => riskAdjustedScore(b) - riskAdjustedScore(a));
  }, [categoryFilter]);

  async function createEmailPreview() {
    const response = await fetch("/api/email-preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capital: profile.capital, currency: profile.currency, email: profile.email, consent: emailConsent })
    });
    const data = await response.json();
    setEmailPreview(data.status === "sent" ? `Sent with Resend\nMessage ID: ${data.messageId ?? "pending"}\n${data.subject}` : `${data.sender}\n${data.subject}`);
  }

  return (
    <main className="min-h-screen bg-ink text-parchment">
      <section className="dossier-grid border-b border-gold/20 bg-[radial-gradient(circle_at_top_left,rgba(201,164,91,0.16),transparent_34%),linear-gradient(135deg,#07121F,#0B1B2B_52%,#183044)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border border-gold/50 bg-paper/5">
              <Search className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">Opportunity Scout AI</p>
              <p className="text-sm text-parchment/65">Public-source investment research</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-parchment/70 md:flex">
            <Lock className="h-4 w-4 text-sage" />
            Server-side keys, audit logs, human approval gates
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-10 pt-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="self-end pb-6">
            <p className="mb-4 inline-flex items-center gap-2 border border-gold/40 bg-ink/50 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-gold">
              <ShieldCheck className="h-4 w-4" /> No transactions. No invented facts.
            </p>
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.95] text-paper md:text-7xl">
              Opportunity Scout AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment/78">
              A decision-support desk for investors who need public-source opportunity discovery, comparable analysis, financial modeling, risk review, and a consent-gated report workflow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#questionnaire" className="inline-flex items-center gap-2 bg-gold px-4 py-3 text-sm font-semibold text-ink">
                <BriefcaseBusiness className="h-4 w-4" /> Start mandate
              </a>
              <a href="#ranking" className="inline-flex items-center gap-2 border border-paper/20 px-4 py-3 text-sm text-paper">
                <BarChart3 className="h-4 w-4" /> View ranking
              </a>
            </div>
          </div>

          <div className="bg-paper p-4 text-ink shadow-dossier">
            <div className="border border-ink/15 p-4">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">{researchQueued ? "Research job queued" : "User mandate draft"}</p>
                  <h2 className="font-display text-3xl font-semibold">USD {profile.capital.toLocaleString()} user-filled mandate</h2>
                </div>
                <BadgeCheck className="h-7 w-7 text-sage" />
              </div>
              <div className="grid gap-3 md:grid-cols-5">
                {timeline.map(([label, text], index) => (
                  <div key={label} className="border border-ink/10 bg-[#FBF7EB] p-3">
                    <p className="font-mono text-[10px] uppercase text-brass">Step {index + 1}</p>
                    <p className="mt-2 text-sm font-semibold">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-ink/62">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={filtered}>
                    <CartesianGrid stroke="#E1D7BF" />
                    <XAxis dataKey="city" tick={{ fill: "#183044", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#183044", fontSize: 12 }} />
                    <Tooltip />
                    <Area dataKey={(item: Opportunity) => riskAdjustedScore(item)} name="Risk-adjusted score" stroke="#8EA58C" fill="#8EA58C55" />
                    <Scatter dataKey="baseReturn" name="Base return %" fill="#C9A45B" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[310px_1fr]">
        <aside id="questionnaire" className="h-fit border border-gold/20 bg-navy p-4">
          <SectionTitle icon={SlidersHorizontal} label="Investor questionnaire" />
          <p className="mt-3 text-sm leading-6 text-parchment/70">
            These fields are filled by the investor. After confirmation, the next stage runs permitted public-source discovery, deduping, and AI-assisted analysis.
          </p>
          <div className="mt-4 grid gap-3">
            <Field label="Full name" value={profile.fullName} onChange={(fullName) => setProfile({ ...profile, fullName })} />
            <Field label="Verified email" value={profile.email} onChange={(email) => setProfile({ ...profile, email })} />
            <NumberField label="Available capital" value={profile.capital} onChange={(capital) => setProfile({ ...profile, capital })} />
            <NumberField label="Minimum investment" value={profile.minInvestment} onChange={(minInvestment) => setProfile({ ...profile, minInvestment })} />
            <NumberField label="Maximum investment" value={profile.maxInvestment} onChange={(maxInvestment) => setProfile({ ...profile, maxInvestment })} />
            <Field label="Preferred locations" value={profile.locations} onChange={(locations) => setProfile({ ...profile, locations })} />
            <SelectField label="Risk tolerance" value={profile.riskTolerance} options={["conservative", "balanced", "aggressive"]} onChange={(riskTolerance) => setProfile({ ...profile, riskTolerance: riskTolerance as InvestorProfile["riskTolerance"] })} />
            <label className="flex items-start gap-3 border border-paper/10 bg-paper/5 p-3 text-sm text-parchment/80">
              <input type="checkbox" checked={profile.legalConfirmation} onChange={(event) => setProfile({ ...profile, legalConfirmation: event.target.checked })} className="mt-1" />
              I confirm I am legally able to make investment decisions or am working with an authorized adult or professional adviser.
            </label>
            <button
              onClick={() => setResearchQueued(true)}
              disabled={!profile.legalConfirmation || !profile.email || profile.industries.length === 0}
              className="inline-flex items-center justify-center gap-2 bg-gold px-4 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Search className="h-4 w-4" /> Submit mandate
            </button>
            {researchQueued && (
              <div className="border border-sage/50 bg-sage/10 p-3 text-sm leading-6 text-parchment/78">
                Mandate received. The production workflow will now run compliant scraping/search connectors, source snapshots, duplicate checks, and AI scoring. Demo cards remain separated until real results are retrieved.
              </div>
            )}
          </div>
        </aside>

        <div className="grid gap-6">
          <section className="border border-gold/20 bg-navy p-4">
            <SectionTitle icon={Filter} label="Search configuration" />
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {[
                ["1", "User submits mandate"],
                ["2", "Public sources searched"],
                ["3", "AI analyzes evidence"],
                ["4", "Report awaits consent"]
              ].map(([step, label]) => (
                <div key={step} className="border border-paper/10 bg-paper/5 p-3">
                  <p className="font-mono text-[10px] uppercase text-gold">Stage {step}</p>
                  <p className="mt-2 text-sm text-parchment/78">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {searchCategories.map((category) => {
                const selectedCategory = profile.industries.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => {
                      const industries = selectedCategory ? profile.industries.filter((item) => item !== category) : [...profile.industries, category];
                      setProfile({ ...profile, industries });
                    }}
                    className={`inline-flex items-center gap-2 border px-3 py-2 text-xs ${selectedCategory ? "border-gold bg-gold/15 text-paper" : "border-paper/10 text-parchment/62"}`}
                  >
                    {selectedCategory && <Check className="h-3 w-3" />}
                    {category}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-none border border-alert/40 bg-alert/10 p-3 text-sm leading-6 text-parchment/75">
              Excluded: {profile.excludedIndustries}. Search adapters must respect robots.txt, terms, rate limits, source snapshots, and prompt-injection isolation.
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className="border border-gold/20 bg-paper p-4 text-ink">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionTitle dark icon={Landmark} label="Discovered opportunities" />
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="border border-ink/15 bg-white px-3 py-2 text-sm">
                  <option>All selected</option>
                  {profile.industries.map((category) => <option key={category}>{category}</option>)}
                </select>
              </div>
              <div className="mt-4 grid gap-3">
                {filtered.map((item) => (
                  <button key={item.id} onClick={() => setSelectedId(item.id)} className={`text-left ${selected.id === item.id ? "border-brass bg-[#FBF7EB]" : "border-ink/10 bg-white"} border p-4`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11px] uppercase text-alert">Demo data</p>
                        <h3 className="mt-1 font-display text-2xl font-semibold">{item.title.replace("DEMO DATA - ", "")}</h3>
                        <p className="mt-1 text-sm text-ink/65">{item.sector} - {item.city}</p>
                      </div>
                      <ScorePill value={riskAdjustedScore(item)} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <OpportunityDetail opportunity={selected} />
          </section>

          <section id="ranking" className="border border-gold/20 bg-navy p-4">
            <SectionTitle icon={Gauge} label="Comparison and ranking" />
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-sm">
                <thead className="bg-paper/10 text-left font-mono text-xs uppercase text-gold">
                  <tr>{["Sector", "Location", "Asking price", "Capital required", "Base return", "Downside", "Payback", "Risk", "Data", "Score", "Recommendation"].map((head) => <th key={head} className="border border-paper/10 p-3">{head}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="text-parchment/82">
                      <td className="border border-paper/10 p-3">{item.sector}</td>
                      <td className="border border-paper/10 p-3">{item.city}</td>
                      <td className="border border-paper/10 p-3">${item.askingPrice.toLocaleString()}</td>
                      <td className="border border-paper/10 p-3">${item.requiredInvestment.toLocaleString()}</td>
                      <td className="border border-paper/10 p-3">{item.baseReturn}%</td>
                      <td className="border border-paper/10 p-3">{item.downsideReturn}%</td>
                      <td className="border border-paper/10 p-3">{item.paybackYears} yrs</td>
                      <td className="border border-paper/10 p-3">{item.riskLevel}</td>
                      <td className="border border-paper/10 p-3">{item.dataCompleteness}</td>
                      <td className="border border-paper/10 p-3">{riskAdjustedScore(item)}</td>
                      <td className="border border-paper/10 p-3">{item.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <AnalysisPanel />
            <ReportPanel onPreview={createEmailPreview} preview={emailPreview} consent={emailConsent} onConsentChange={setEmailConsent} />
          </section>

          <section className="border border-gold/20 bg-navy p-4">
            <SectionTitle icon={BadgeCheck} label="Analysis output checkpoint" />
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {[
                ["Market size", "A defensible TAM/SAM/SOM range with cited sources and formulas."],
                ["Competition", "Comparable businesses, real prices, and competitor count by location."],
                ["Charts", "At least two readable visuals a reviewer can understand without narration."],
                ["Evidence", "Every claim linked to source URL, publication date, data year, and retrieval date."]
              ].map(([title, text]) => (
                <div key={title} className="border border-paper/10 bg-paper/5 p-3">
                  <p className="font-semibold text-paper">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-parchment/68">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 border border-sage/40 bg-sage/10 p-3 text-sm leading-6 text-parchment/75">
              Production analysis can use internal chart generation first, or export a cleaned dataset for tools like Julius AI or a Colab Python workflow. The app remains the source of record for assumptions, citations, and report approval.
            </p>
          </section>
        </div>
      </div>

      <footer className="border-t border-gold/20 bg-navy px-5 py-6">
        <p className="mx-auto max-w-7xl text-sm leading-6 text-parchment/70">{disclaimer}</p>
      </footer>
    </main>
  );
}

function SectionTitle({ icon: Icon, label, dark = false }: { icon: typeof Search; label: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] ${dark ? "text-brass" : "text-gold"}`}>
      <Icon className="h-4 w-4" /> {label}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-xs uppercase tracking-[0.12em] text-gold/85">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="border border-paper/10 bg-paper/95 px-3 py-2 text-sm normal-case tracking-normal text-ink" />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-1 text-xs uppercase tracking-[0.12em] text-gold/85">
      {label}
      <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className="border border-paper/10 bg-paper/95 px-3 py-2 text-sm normal-case tracking-normal text-ink" />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-xs uppercase tracking-[0.12em] text-gold/85">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="border border-paper/10 bg-paper/95 px-3 py-2 text-sm normal-case tracking-normal text-ink">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ScorePill({ value }: { value: number }) {
  return <span className="grid h-14 w-14 place-items-center border border-brass bg-ink font-mono text-lg text-gold">{value}</span>;
}

function OpportunityDetail({ opportunity }: { opportunity: Opportunity }) {
  return (
    <aside className="border border-gold/20 bg-navy p-4">
      <SectionTitle icon={FileText} label="Opportunity details" />
      <h3 className="mt-4 font-display text-3xl font-semibold text-paper">{opportunity.title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <BadgeCheck className="h-5 w-5 text-sage" />
        <span className="text-sm text-parchment/72">Source reliability {opportunity.sourceReliability}/100</span>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Metric label="Asking price" value={`$${opportunity.askingPrice.toLocaleString()}`} />
        <Metric label="Total capital" value={`$${opportunity.requiredInvestment.toLocaleString()}`} />
        <Metric label="Raw score" value={`${weightedScore(opportunity)}/100`} />
        <Metric label="Risk adjusted" value={`${riskAdjustedScore(opportunity)}/100`} />
      </dl>
      <p className="mt-5 text-sm leading-6 text-parchment/72">{opportunity.thesis}</p>
      <div className="mt-5 border border-alert/35 bg-alert/10 p-3">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-paper"><AlertTriangle className="h-4 w-4 text-alert" /> Requires verification</p>
        <ul className="space-y-2 text-sm leading-5 text-parchment/70">
          {opportunity.warnings.map((warning) => <li key={warning}>{warning}</li>)}
        </ul>
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-paper/10 bg-paper/5 p-3">
      <dt className="font-mono text-[10px] uppercase text-gold/80">{label}</dt>
      <dd className="mt-1 font-semibold text-paper">{value}</dd>
    </div>
  );
}

function AnalysisPanel() {
  return (
    <section className="border border-gold/20 bg-paper p-4 text-ink">
      <SectionTitle dark icon={TrendingUp} label="Market and financial analysis" />
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={projection}>
            <CartesianGrid stroke="#E1D7BF" />
            <XAxis dataKey="year" tick={{ fill: "#183044", fontSize: 12 }} />
            <YAxis tick={{ fill: "#183044", fontSize: 12 }} />
            <Tooltip />
            <Area dataKey="downside" stroke="#D86C4A" fill="#D86C4A44" />
            <Area dataKey="base" stroke="#8EA58C" fill="#8EA58C55" />
            <Area dataKey="upside" stroke="#C9A45B" fill="#C9A45B55" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {heatMap.flatMap((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`} className="grid h-14 place-items-center text-sm font-semibold" style={{ backgroundColor: value < 0 ? "#D86C4A" : value > 10 ? "#8EA58C" : "#E7D6A8" }}>
              {value}%
            </div>
          ))
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-ink/68">Sensitivity heat map uses editable assumptions for revenue growth and EBITDA margin. Values are clearly preliminary estimates until source financials are verified.</p>
    </section>
  );
}

function ReportPanel({ onPreview, preview, consent, onConsentChange }: { onPreview: () => void; preview: string | null; consent: boolean; onConsentChange: (value: boolean) => void }) {
  const riskMatrix = demoOpportunities.map((item) => ({ x: item.scores.riskPenalty, y: item.baseReturn, z: riskAdjustedScore(item), name: item.city }));
  return (
    <section className="border border-gold/20 bg-paper p-4 text-ink">
      <SectionTitle dark icon={Mail} label="Final report and email preview" />
      <div className="mt-4 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid stroke="#E1D7BF" />
            <XAxis type="number" dataKey="x" name="Risk penalty" tick={{ fill: "#183044", fontSize: 12 }} />
            <YAxis type="number" dataKey="y" name="Base return" tick={{ fill: "#183044", fontSize: 12 }} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={riskMatrix}>
              {riskMatrix.map((entry) => <Cell key={entry.name} fill={entry.z > 55 ? "#8EA58C" : "#C9A45B"} />)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <label className="mt-4 flex items-start gap-3 border border-ink/10 bg-[#FBF7EB] p-3 text-sm leading-5 text-ink/70">
        <input type="checkbox" checked={consent} onChange={(event) => onConsentChange(event.target.checked)} className="mt-1" />
        I explicitly consent to send this preliminary report by email. If Resend is not configured, the app will show a demo preview only.
      </label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 text-sm font-semibold">
          <Download className="h-4 w-4" /> PDF report
        </button>
        <button onClick={onPreview} className="inline-flex items-center justify-center gap-2 bg-ink px-4 py-3 text-sm font-semibold text-paper">
          <Mail className="h-4 w-4" /> Preview email
        </button>
      </div>
      {preview && <pre className="mt-4 whitespace-pre-wrap border border-ink/10 bg-[#FBF7EB] p-3 font-mono text-xs leading-5 text-ink/75">{preview}</pre>}
    </section>
  );
}
