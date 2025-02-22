import {
  faCircleArrowLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ScrollReveal from "src/animations/ScrollReveal"
import CompanyCard from "./CompanyCard"
import CompanyLatest from "./CompanyLatest"
import CompanyStats from "./CompanyStats"

export default function CompanyDetails({ company, ecosystemName }) {
  const router = useRouter()

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#6600cc] border-t-transparent"></div>
      </div>
    )
  }

  console.log(company)

  const handleBackClick = () => {
    const url = `/ecosystems/${ecosystemName}?tab=companies`
    window.open(url, "_self")
  }

  const companyWebsite = company?.Website || "#"

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <div>
        <button
          onClick={handleBackClick}
          className="text-4xl cursor-pointer fixed bottom-20 p-8 left-4"
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </button>

        <div className="pb-8 flex items-center gap-4">
          <Image
            src={company?.Logo || "/placeholder.png"}
            alt={`${company?.["Company Name"]} logo`}
            width={96}
            height={96}
          />
          <a
            href={companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>

        <p className="pb-8 text-xl leading-8">{company?.["Company Summary"]}</p>

        <CompanyStats stats={formatStats(company)} />

        <ScrollReveal id="latestDevelopments">
          <CompanyLatest
            title="Latest Developments"
            data={formatSection(company?.["Latest Developments"])}
          />
        </ScrollReveal>

        <ScrollReveal id="foundingTeam">
          <CompanyCard
            title="Founding Team"
            data={formatSection(company?.["Founding Team"])}
          />
        </ScrollReveal>

        <ScrollReveal id="investors">
          <CompanyCard
            title="Key Investors"
            data={formatSection(company?.["Key Investors"])}
          />
        </ScrollReveal>

        <ScrollReveal id="customerGrowth">
          <CompanyCard
            title="Customer Growth"
            data={formatSection(company?.["Customer Growth"])}
          />
        </ScrollReveal>

        <ScrollReveal id="patents">
          <CompanyCard
            title="Patents"
            data={formatSection(company?.["Patents"])}
          />
        </ScrollReveal>

        <ScrollReveal id="financials">
          <CompanyCard
            title="Financials"
            data={formatSection(company?.["Financials"])}
          />
        </ScrollReveal>

        {/* <ScrollReveal id="products">
          <h2 className="pb-4">Products</h2>
          {company?.Products?.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {company.Products.map((product, index) => (
                <CompanyProductStatCard key={index} product={product} />
              ))}
            </div>
          ) : (
            <p>No products available for this company.</p>
          )}
        </ScrollReveal> */}
      </div>
    </div>
  )
}

// 🛠 Utility Functions

function formatStats(company) {
  return [
    { label: "Industry", value: company?.Industry?.join(", ") || "N/A" },
    { label: "Funding Amount", value: company?.["Funding Amount"] || "N/A" },
    { label: "Funding Stage", value: company?.["Funding Stage"] || "N/A" },
    { label: "Employees", value: company?.Employees || "N/A" },
    { label: "Year Founded", value: company?.["Year Founded"] || "N/A" },
    { label: "HQ", value: company?.HQ || "N/A" },
  ]
}

function formatSection(data) {
  if (!data) return []
  return Array.isArray(data) ? data.map((item) => ({ name: item })) : []
}
