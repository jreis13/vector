import arcLogo from "/public/logos/arcLogo.png"
import krooLogo from "/public/logos/krooLogo.svg"
import stratiphyLogo from "/public/logos/stratiphyLogo.svg"

export const companiesData = [
  {
    id: 1,
    logo: krooLogo,
    name: "Kroo",
    summary:
      "Digital bank specifically designed for young adults, with an impressive 145k customer base. Amidst global economic uncertainty, this innovative platform was set to raise £1 million in a fiercely competitive UK market.",
    mainStats: [
      { label: "Industry", value: "Investments" },
      { label: "Funding Amount", value: "£802k" },
      { label: "Funding Stage", value: "Seed" },
    ],
    stats: [
      { label: "Last Valuation", value: "£3,000,000" },
      { label: "HQ", value: "London, UK" },
      { label: "Employees", value: "30" },
      { label: "Type", value: "B2C, B2B" },
      { label: "Website", value: "https://www.stratiphy.com" },
    ],
    vectorScore: 7,
  },
  {
    id: 2,
    logo: arcLogo,
    name: "Arc",
    summary: "Helicopter goes vroom.",
    mainStats: [
      { label: "Industry", value: "Investments" },
      { label: "Funding Amount", value: "£600k" },
      { label: "Funding Stage", value: "Seed" },
    ],
    stats: [
      { label: "Last Valuation", value: "£3,000,000" },
      { label: "HQ", value: "London, UK" },
      { label: "Employees", value: "30" },
      { label: "Type", value: "B2C, B2B" },
      { label: "Website", value: "https://www.stratiphy.com" },
    ],
    vectorScore: 8,
  },
  {
    id: 3,
    logo: stratiphyLogo,
    name: "Stratiphy",
    summary:
      "Digital robot advisor was raising funds through its 3rd crowdfunding campaign, after secured £1 million consortium grant. This innovative platform is set to revolutionize AI investment solutions for its users.",
    mainStats: [
      { label: "Industry", value: "Investments" },
      { label: "Funding Amount", value: "£821k" },
      { label: "Funding Stage", value: "Seed" },
    ],
    stats: [
      { label: "Last Valuation", value: "£3,000,000" },
      { label: "HQ", value: "London, UK" },
      { label: "Employees", value: "30" },
      { label: "Type", value: "B2C, B2B" },
      { label: "Website", value: "https://www.stratiphy.com" },
    ],
    vectorScore: 9,
  },
]
