export const industryOptions = [
  { label: "Aerospace", keywords: ["Aerospace"] },
  { label: "Aviation", keywords: ["Aviation"] },
  { label: "Defense", keywords: ["Defense"] },
  { label: "Space", keywords: ["Space"] },
  { label: "Urban Air Mobility", keywords: ["Urban Air Mobility"] },
  { label: "EVTOL", keywords: ["EVTOL"] },
]

export const fundingStageOptions = [
  { label: "Early Stage", keywords: ["Early Stage", "Seed"] },
  { label: "Series B", keywords: ["Series B"] },
  { label: "Series C", keywords: ["Series C"] },
  { label: "Series D", keywords: ["Series D"] },
  { label: "Series E", keywords: ["Series E"] },
  { label: "Later Stage", keywords: ["Later Stage"] },
  { label: "IPO", keywords: ["IPO", "Public"] },
]

export const fundingAmountRanges = [
  { label: "< $1M", min: 0, max: 1000000 },
  { label: "$1M - $10M", min: 1000000, max: 10000000 },
  { label: "$10M - $50M", min: 10000000, max: 50000000 },
  { label: "$50M - $100M", min: 50000000, max: 100000000 },
  { label: "$100M - $500M", min: 100000000, max: 500000000 },
  { label: "> $500M", min: 500000000, max: Infinity },
]
