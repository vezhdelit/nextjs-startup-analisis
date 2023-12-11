export interface Criteria {
  lingusticValue: "H" | "HC" | "C" | "BC" | "B";
  credibility: number; // The credibility is in the range [0, 1]
}

export interface TeamCriteria {
  lingusticValue: "H" | "HC" | "C" | "BC" | "B";
  credibility: number; // The credibility is in the range [0, 1]
  expected: number;
}

export interface TermU {
  lingusticValue: string;
  aggregatedValue: number;
}
