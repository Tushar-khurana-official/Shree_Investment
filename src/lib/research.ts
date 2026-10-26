import localData from "@/content/funds.json";

export type RiskLevel = "Low" | "Low to Moderate" | "Moderate" | "Moderately High" | "High" | "Very High";
export const RISK_LEVELS: RiskLevel[] = ["Low", "Low to Moderate", "Moderate", "Moderately High", "High", "Very High"];

export type Fund = {
  id: string;
  name: string;
  amc: string;
  category: string;
  assetClass: string;
  risk: RiskLevel;
  benchmark: string;
  nav: number;
  aumCr: number;
  expenseRatio: number;
  returns: { "1y": number | null; "3y": number | null; "5y": number | null };
  launchDate: string;
  exitLoad: string;
};

export type FundDataset = { asOf: string; isSample: boolean; source: string; funds: Fund[] };

/**
 * Loads scheme data. Uses RESEARCH_API_URL (same JSON shape) when set, otherwise the curated local file.
 * Factual data only; no ratings or recommendations.
 */
export async function getFundData(): Promise<FundDataset> {
  const url = process.env.RESEARCH_API_URL;
  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 * 60 * 6 } });
      if (res.ok) return (await res.json()) as FundDataset;
    } catch (err) {
      console.error("[research] feed failed, using local data", err);
    }
  }
  return localData as FundDataset;
}
