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
    stats: [
      { label: "Employees", value: "10,000+" },
      { label: "Revenue", value: "$5B" },
      { label: "Market Cap", value: "$50B" },
    ],
    vectorScore: 7,
  },
  {
    id: 2,
    logo: arcLogo,
    name: "Arc",
    summary: "Helicopter goes vroom.",
    stats: [
      { label: "Employees", value: "20,000+" },
      { label: "Revenue", value: "$10B" },
      { label: "Market Cap", value: "$100B" },
    ],
    vectorScore: 8,
  },
  {
    id: 3,
    logo: stratiphyLogo,
    name: "Stratiphy",
    summary:
      "Digital robot advisor was raising funds through its 3rd crowdfunding campaign, after secured £1 million consortium grant. This innovative platform is set to revolutionize AI investment solutions for its users.",
    stats: [
      { label: "Employees", value: "30,000+" },
      { label: "Revenue", value: "$15B" },
      { label: "Market Cap", value: "$150B" },
    ],
    vectorScore: 9,
  },
]
