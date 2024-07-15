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
      { label: "Industry", value: "Investments" },
      { label: "Funding Amount", value: "£802k" },
      { label: "Funding Stage", value: "Seed" },
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
    summary:
      "ARC Aerosystems is a pioneering technology firm dedicated to advancing a portfolio of civil aircraft, both conventional and hybrid-electric, specializing in vertical take-off and landing (VTOL) capabilities. The company’s mission is to foster the growth of sustainable civil air transport technology that serves the benefit of humanity and the environment. ARC Aerosystems is leading the way in the development of hybrid-electric VTOL aircraft set to revolutionize urban air mobility and regional air transport, emphasizing efficiency, reliability, and environmental sustainability",
    mainStats: [
      { label: "Industry", value: "Aerospace, Aviation" },
      { label: "Funding Amount", value: "$83.000.000" },
      { label: "Funding Stage", value: "Early-stage (Series A)" },
    ],
    stats: [
      { label: "Industry", value: "Aerospace, Aviation" },
      { label: "Funding Amount", value: "$83.000.000" },
      { label: "Funding Stage", value: "Early-stage (Series A)" },
      { label: "Last Valuation", value: "Unclear" },
      {
        label: "HQ",
        value: "Cranfield Technology Park, Cranfield, United Kingdom",
      },
      { label: "Employees", value: "11-50" },
      { label: "Type", value: "B2B" },
      { label: "Website", value: "https://www.arcaerosystems.com" },
    ],
    foundingTeam: [
      {
        label: "Dr. Seyed Mohseni",
        value: "CEO & CO-Founder",
        linkedin: "https://www.linkedin.com/in/seyed-mohseni-92953a4a/",
      },
      {
        label: "John Wighton",
        value: "Head of Design Organization",
        linkedin: "https://www.linkedin.com/in/johnwighton/",
      },
      {
        label: "Prof. Iain Gray",
        value: "Chief Strategy Advisor",
        linkedin: "https://www.linkedin.com/in/iain-gray-120aa88/",
      },
      {
        label: "Mohammad Reza Marghoubkar",
        value: "Chief Operating Officer",
        linkedin:
          "https://www.linkedin.com/in/mohammad-reza-marghoubkar-aab433155/",
      },
      {
        label: "Norman Wijker",
        value: "Chief Designer",
        linkedin: "https://www.linkedin.com/in/norman-wijker-8958b712/",
      },
    ],
    investors: [
      {
        label: "Innovate UK",
        value:
          "Supports ARC Aerosystems through the Future Flight Challenge program, providing substantial grants for innovative technologies.",
        logo: "/logos/innovate-uk.svg",
        website: "https://www.ukri.org/councils/innovate-uk/",
      },
      {
        label: "British Business Bank",
        value:
          "Government-owned bank backing ARC Aerosystems with funding, part of their £10 million total funding secured.",
        logo: "/logos/british-business-bank.svg",
        website: "https://www.british-business-bank.co.uk/",
      },
      {
        label: "Turquoise International",
        value:
          "Venture capital firm funding ARC Aerosystems, contributing to sustainable aviation technologies.",
        logo: "/logos/turquoise.jpg",
        website: "https://turquoise.eu/",
      },
      {
        label: "EIT KIC Urban Mobility",
        value:
          "Accelerator and incubator supporting ARC Aerosystems in driving urban mobility projects.",
        logo: "/logos/urban-mobility.svg",
        website: "https://www.eiturbanmobility.eu/",
      },
      {
        label: "Life Shield",
        value:
          "Saudi-backed start-up partnering with ARC Aerosystems for new aircraft projects, aligning with Vision 2030 goals.",
        logo: "/logos/life-shield.webp",
        website: "https://lifeshield.com.sa/",
      },
    ],
    marketSize: [
      { label: "TAM (Globally)", value: "$3.60 Billion in 2024" },
      {
        label: "TAM (Europe)",
        value: "€1.26 Billion in 2024 / €6.8 Billion by 2030",
      },
      {
        label: "Projected Growth",
        value: "$21.13 Billion by 2030",
      },
      {
        label: "Averaged CAGR (2024-2030)",
        value: "24.23%",
      },
    ],
    customers: [
      "Aerial Service Operators",
      "Logistics",
      "First Responders (Medical, Law Enforcement)",
      "Surveillance Providers",
      "Shuttle/Air Taxi Services",
    ],
    valueProposition:
      "ARC Aerosystems leverages innovative technology by developing VTOL and hybrid-electric aircraft that can operate from helipads or rural locations without traditional runways, enhancing accessibility and flexibility.  Their advanced designs, exemplified by the Pegasus, Linx P9, and C150 aircraft, feature cutting-edge aerodynamics and propulsion systems, offering greater reliability, efficiency, and lower emissions compared to traditional aircraft. This positions ARC Aerosystems as a leader in practical and advanced air mobility solutions.  The company’s commitment to sustainability is evident through the reduced environmental impact of their hybrid-electric systems, which significantly lower carbon emissions and fuel consumption, and their efficient resource utilization aims to reduce maintenance costs and improve operational efficiency.   Additionally, ARC Aerosystems offers cost-effective solutions with lower operational costs than traditional helicopters and planes and caters to a wide range of applications, including passenger transport, cargo delivery, and medical supply transport, enhancing their value proposition by addressing multiple market needs with efficient and reliable solutions​",
    revenueStreams: [
      { label: "Aircraft Sales", value: "Sale of the aircraft to companies" },
      {
        label: "Leasing",
        value:
          "Unclear of the type of leasings the companies indulges in (Wet-leasings or Dry-leasings)",
      },
      {
        label: "Service Contracts",
        value:
          "The company can collect revenues from maintenance and support of the aircraft",
      },
      {
        label: "Technology Licensing and Partnerships",
        value:
          "The company can earn revenue from IP licensing or via strategic partnerships with other players in the aviation industry.",
      },
      {
        label: "Training and Advisory Services",
        value:
          "From a broader viewpoint, the company can create a revenue stream from its pilot/maintenance training programs and generic advisory.",
      },
    ],
    costStructure: {
      fixed: [
        "Extensive development in R&D given the nature of VTOL technology and hybrid eletric propulsion systems. Consequential Prototyping and testing of new products and concepts is also costly",
        "Certifications and Compliance - The necessity to have every product certified is a considerable cost and can halt growth prospects",
        "Facility Costs are also relevant given the nature of their products",
        "Equipment depreciation presents a relevant fixed cost in this industry",
      ],
      variable: [
        "Materials and Supplies (Both for Product and for assembly) - These types of costs are particularly relevant in an early-stage product like these, since they can be significantly more expensive",
        "Labor Costs",
      ],
      scalability: [
        "With the proper certifications, the company can easily operate its aircraft in any country. Their products are heavily scalable.",
      ],
    },
    customerGrowth: ["Sold 5 Pegasus Aircraft - To be delivered in 2026."],
    patents: [
      "Yes. However, its unclear how many patents the company actually has registered.",
    ],
    financials: [
      { label: "Fixed Assets", value: "£10,541,154" },
      { label: "Current Assets", value: "£865,899" },
      { label: "Total Assets less current liabilities", value: "£7,963,170" },
      { label: "Net Assets", value: "£1,406,660" },
      { label: "Estimated Monthly Burn Rate", value: "£345,776" },
    ],
    products: [
      {
        model: "Pegasus",
        type: "Gyroplane",
        passengers: 2,
        speed: "160 KM/h",
        range: "610 KM",
        details:
          "Vertical jump take-off, no-roll landing, reduced noise, autorotation for safety. Suitable for law enforcement, EMS, infrastructure inspection, air taxi, environmental monitoring, and sightseeing.",
      },
      {
        model: "Linx P3",
        type: "Hybrid VTOL",
        passengers: 3,
        speed: "300 KM/h",
        range: "1400 KM",
        details:
          "Jump take-off, no-roll landing, hybrid engine, reduced noise, enhanced safety using autorotation.",
      },
      {
        model: "Linx P9",
        type: "Hybrid VTOL",
        passengers: 9,
        speed: "300 KM/h",
        range: "1400 KM",
        details:
          "Jump take-off, no-roll landing, hybrid engine, reduced noise, enhanced safety using autorotation. Suitable for regional air mobility.",
      },
    ],
    keyCompetitors: [
      {
        name: "Vertical Airspace",
        yearFounded: "2016",
        HQ: "Bristol, England",
        employees: "201-500",
        website: "https://vertical-aerospace.com/",
        funding: "$350.000.000",
        products: 1,
      },
      {
        name: "Volocopter",
        yearFounded: "2011",
        HQ: "Bruchsal, Germany",
        employees: "500-1000",
        website: "https://www.volocopter.com/en",
        funding: "$550.000.000",
        products: 3,
      },
      {
        name: "Lilium",
        yearFounded: "2015",
        HQ: "Wessling, Germany",
        employees: "500-1000",
        website: "https://lilium.com/",
        funding: "$800.000.000 (IPO)",
        products: 1,
      },
    ],
    comparison: [
      {
        name: "ARC Aerosystems",

        products: [
          {
            name: "Pegasus",
            function: "Airtaxi",
            type: "Gyroplane",
            passengers: 2,
            speed: "160 KM/h",
            range: "610 KM",
          },
          {
            name: "Linx P3",
            function: "Airtaxi",
            type: "Hybrid",
            passengers: 3,
            speed: "300 KM/h",
            range: "1400 KM",
          },
          {
            name: "Linx P9",
            function: "Airtaxi",
            type: "Hybrid",
            passengers: 9,
            speed: "300 KM/h",
            range: "1400 KM",
          },
        ],
      },
      {
        name: "Vertical",

        products: [
          {
            name: "VX4",
            function: "Airtaxi",
            type: "eVTOL",
            passengers: 4,
            speed: "240 KM/h",
            range: "161 KM",
          },
        ],
      },
      {
        name: "Volocopter",

        products: [
          {
            name: "Volocity",
            function: "Airtaxi",
            type: "eVTOL",
            passengers: 2,
            speed: "110 KM/h",
            range: "35 KM",
          },
          {
            name: "VoloConne",
            function: "Airtaxi",
            type: "eVTOL",
            passengers: 4,
            speed: "180 KM/h",
            range: "100 KM",
          },
        ],
      },
      {
        name: "Lilium",

        products: [
          {
            name: "Lilium",
            function: "Airtaxi",
            type: "eVTOL",
            passengers: 6,
            speed: "280 KM/h",
            range: "250 KM",
          },
        ],
      },
    ],
    legal:
      "Each aircraft needs to be approved by the designated entity (EASA in Europe |CAA in UK) and this process can be exhaustive and expensive. The industry is extremely regulated. ARC has their aircraft certified by both the CAA and FAA in some products.",
    ecosystem: [
      "Capital Intensive",
      "Technologically Advanced",
      "Highly Regulated",
      "High Production Costs",
      "Extremely Limited Number of Suppliers",
      "Highly Trained Workforce Required",
      "Moderate Competitive Rivalry - few newcomers but face serious competition from legacy companies in the Aviation Industry",
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
      { label: "Industry", value: "Investments" },
      { label: "Funding Amount", value: "£821k" },
      { label: "Funding Stage", value: "Seed" },
      { label: "Last Valuation", value: "£3,000,000" },
      { label: "HQ", value: "London, UK" },
      { label: "Employees", value: "30" },
      { label: "Type", value: "B2C, B2B" },
      { label: "Website", value: "https://www.stratiphy.com" },
    ],
    vectorScore: 9,
  },
]
