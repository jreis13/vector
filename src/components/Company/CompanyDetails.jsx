import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ScrollReveal from "src/animations/ScrollReveal"
import CompanyCard from "./CompanyCard"
import CompanyLatest from "./CompanyLatest"
import CompanyProductStatCard from "./CompanyProductStatCard"
import CompanyStats from "./CompanyStats"
import CompanyTable from "./CompanyTable"

export default function CompanyDetails({ company, ecosystemName }) {
  const router = useRouter()

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Company not found...</p>
      </div>
    )
  }

  const handleBackClick = () => {
    const url = `/ecosystems/${ecosystemName}?tab=companies`
    window.open(url, "_self")
  }

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

        <ScrollReveal id="keyInvestors">
          <CompanyCard
            title="Key Investors"
            data={formatSection(
              company?.["Key Investors"],
              "Key Investors",
              company
            )}
          />
        </ScrollReveal>

        <ScrollReveal id="customerGrowth">
          <CompanyTable
            title="Customer Growth"
            groupedCompanies={formatCustomerGrowth(company?.CustomerGrowth)}
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

        <ScrollReveal id="products">
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
        </ScrollReveal>
      </div>
    </div>
  )
}

function formatStats(company) {
  return [
    {
      label: "Funding Amount",
      value: Array.isArray(company?.["Text Amount"])
        ? company["Text Amount"][0]
        : company?.["Text Amount"] || "N/A",
    },
    {
      label: "Type",
      value: Array.isArray(company?.Type)
        ? company.Type[0]
        : company?.Type || "N/A",
    },
    {
      label: "Industry",
      value: Array.isArray(company?.Industry)
        ? company.Industry[0]
        : company?.Industry || "N/A",
    },
    {
      label: "Funding Stage",
      value: Array.isArray(company?.["Funding Round (from Funding Stage)"])
        ? company["Funding Round (from Funding Stage)"][0]
        : company?.["Funding Round (from Funding Stage)"] || "N/A",
    },
    { label: "Employees", value: company?.["# of Employees"] || "N/A" },
    { label: "Year Founded", value: company?.["Year Founded"] || "N/A" },
    { label: "HQ", value: company?.HQ || "N/A" },
  ]
}

function formatSection(data, title, company) {
  if (!data) return []

  if (title === "Financials") {
    return data.map((item) => {
      let parsedItem = typeof item === "string" ? JSON.parse(item) : item

      return {
        name: parsedItem.metric || "Unknown Metric",
        description:
          parsedItem.value !== undefined ? parsedItem.value.toString() : "N/A",
        source: parsedItem.year ? `Year: ${parsedItem.year}` : "N/A",
        icon: parsedItem.Icon || "questionIcon",
      }
    })
  }

  if (title === "Key Investors") {
    const investorNames = company?.["Name (from Key Investors)"]
    const investorDescriptions = company?.["Description (from Key Investors)"]
    const investorLogos = company?.["Logo (from Key Investors)"]
    const investorLinks = company?.["Link (from Key Investors)"]

    if (Array.isArray(investorNames)) {
      return investorNames.map((name, index) => ({
        name,
        description: Array.isArray(investorDescriptions)
          ? investorDescriptions[index] || ""
          : "",
        logo: Array.isArray(investorLogos) ? investorLogos[index] || "" : "",
        link: Array.isArray(investorLinks) ? investorLinks[index] || "" : "",
      }))
    }
  }

  if (Array.isArray(data)) {
    return data.map((item) => ({
      name: typeof item === "string" ? item : JSON.stringify(item),
    }))
  }

  return [{ name: data }]
}

function formatCustomerGrowth(data) {
  if (!data || !Array.isArray(data)) return []

  const groupedData = {}

  data.forEach((item) => {
    if (!item.company) return

    if (!groupedData[item.company]) {
      groupedData[item.company] = {
        companyName: item.company,
        orders: [],
      }
    }

    groupedData[item.company].orders.push({
      model: item.model || "N/A",
      type: item.type || "N/A",
      numberOfOrders: item.numberOfOrders || "N/A",
      buyer: item.buyer || "N/A",
      orderDate: item.orderDate || "N/A",
    })
  })

  return Object.values(groupedData)
}
