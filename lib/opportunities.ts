import { Opportunity } from "@/lib/types";

export const searchCategories = [
  "Hotels and hospitality",
  "Commercial real estate",
  "Residential developments",
  "Warehouses and logistics",
  "Land and development projects",
  "Restaurants and food businesses",
  "Retail businesses",
  "Franchises",
  "Manufacturing companies",
  "Technology companies",
  "E-commerce businesses",
  "Healthcare businesses",
  "Education businesses",
  "Agriculture and food production",
  "Renewable energy",
  "Existing businesses for sale",
  "Startups and private companies"
];

export const demoOpportunities: Opportunity[] = [
  {
    id: "beirut-boutique-hotel",
    title: "DEMO DATA - Boutique hotel repositioning near Beirut waterfront",
    sector: "Hotels and hospitality",
    type: "Acquisition with renovation",
    country: "Lebanon",
    city: "Beirut",
    askingPrice: 1850000,
    requiredInvestment: 2350000,
    currency: "USD",
    description: "A 32-key urban hotel requiring brand refresh, revenue-management upgrades, and verified title diligence before any seller contact.",
    revenue: 720000,
    ebitda: 138000,
    assetsIncluded: "Operating company, FF&E, leasehold improvements",
    employees: 24,
    size: "32 keys",
    seller: "Demo public listing aggregator",
    url: "https://example.com/demo/beirut-hotel",
    publicationDate: "2026-05-19",
    retrievedDate: "2026-07-18",
    contact: "Public broker email shown in original listing",
    dataCompleteness: 73,
    sourceReliability: 62,
    warnings: ["Financials are seller-disclosed and unaudited", "Availability not confirmed", "Renovation budget needs contractor quote"],
    scores: { expectedReturn: 72, downsideResilience: 54, marketAttractiveness: 70, askingPrice: 61, cashFlowQuality: 57, strategicFit: 82, dataReliability: 62, liquidity: 48, riskPenalty: 18 },
    recommendation: "WORTH INVESTIGATING",
    thesis: "Asset could benefit from tourism recovery and disciplined operating controls, but only if title, permits, and renovation costs verify cleanly.",
    principalRisks: ["Seasonality", "Currency and macro volatility", "Owner dependence in brokered financial claims"],
    valuationRange: [1600000, 2200000],
    baseReturn: 12.4,
    downsideReturn: 4.1,
    paybackYears: 6.7,
    riskLevel: "High"
  },
  {
    id: "metn-logistics-warehouse",
    title: "DEMO DATA - Last-mile logistics warehouse in Metn",
    sector: "Warehouses and logistics",
    type: "Commercial property acquisition",
    country: "Lebanon",
    city: "Metn",
    askingPrice: 1350000,
    requiredInvestment: 1580000,
    currency: "USD",
    description: "Industrial warehouse with tenancy assumptions that require lease document verification and independent comparable rent checks.",
    revenue: 168000,
    ebitda: 122000,
    assetsIncluded: "Freehold property, loading bays, cold-storage-ready utilities",
    employees: 0,
    size: "2,900 sqm",
    seller: "Demo real-estate agency",
    url: "https://example.com/demo/metn-warehouse",
    publicationDate: "2026-04-11",
    retrievedDate: "2026-07-18",
    contact: "Agency phone number in public listing",
    dataCompleteness: 81,
    sourceReliability: 70,
    warnings: ["Tenant covenant quality unknown", "Title and zoning must be independently checked"],
    scores: { expectedReturn: 66, downsideResilience: 71, marketAttractiveness: 68, askingPrice: 73, cashFlowQuality: 75, strategicFit: 76, dataReliability: 70, liquidity: 62, riskPenalty: 10 },
    recommendation: "HIGH-PRIORITY DUE DILIGENCE",
    thesis: "Lower operational complexity and logistics demand make this the cleanest starting point if lease income and property title are verified.",
    principalRisks: ["Tenant concentration", "Zoning/title defects", "Interest-rate sensitivity"],
    valuationRange: [1280000, 1660000],
    baseReturn: 10.9,
    downsideReturn: 6.2,
    paybackYears: 7.9,
    riskLevel: "Medium"
  },
  {
    id: "food-production-sme",
    title: "DEMO DATA - Specialty food production SME",
    sector: "Agriculture and food production",
    type: "Majority acquisition",
    country: "Lebanon",
    city: "Bekaa",
    askingPrice: 920000,
    requiredInvestment: 1250000,
    currency: "USD",
    description: "Small manufacturer with export potential; analysis depends on audited revenue, licenses, and customer concentration records.",
    revenue: 1100000,
    ebitda: 165000,
    assetsIncluded: "Production equipment, brand, inventory, distribution relationships",
    employees: 38,
    size: "1,400 sqm facility",
    seller: "Demo chamber publication",
    url: "https://example.com/demo/food-sme",
    publicationDate: "2026-03-02",
    retrievedDate: "2026-07-18",
    contact: "Seller contact listed publicly",
    dataCompleteness: 69,
    sourceReliability: 66,
    warnings: ["Customer concentration not disclosed", "Export claims require customs and invoice verification"],
    scores: { expectedReturn: 78, downsideResilience: 58, marketAttractiveness: 74, askingPrice: 76, cashFlowQuality: 61, strategicFit: 68, dataReliability: 66, liquidity: 44, riskPenalty: 16 },
    recommendation: "CONSIDER ONLY IF CONDITIONS ARE MET",
    thesis: "Attractive price-to-EBITDA on seller numbers, but verification of margins, food licenses, and export durability is decisive.",
    principalRisks: ["Supplier input inflation", "Food safety compliance", "Management transition"],
    valuationRange: [780000, 1180000],
    baseReturn: 15.1,
    downsideReturn: 2.8,
    paybackYears: 5.8,
    riskLevel: "High"
  }
];

export function weightedScore(opportunity: Opportunity) {
  const s = opportunity.scores;
  return Math.round(
    s.expectedReturn * 0.2 +
      s.downsideResilience * 0.15 +
      s.marketAttractiveness * 0.15 +
      s.askingPrice * 0.15 +
      s.cashFlowQuality * 0.1 +
      s.strategicFit * 0.1 +
      s.dataReliability * 0.1 +
      s.liquidity * 0.05
  );
}

export function riskAdjustedScore(opportunity: Opportunity) {
  return Math.max(0, weightedScore(opportunity) - opportunity.scores.riskPenalty);
}
