import {
  faCircleArrowLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ScrollReveal from "src/animations/ScrollReveal"
import CompanyCardsClickable from "./CompanyCardsClickable"
import CompanyCardsNonClickable from "./CompanyCardsNonClickable"
import CompanyProductStatCard from "./CompanyProductStatCard"
import CompanyStats from "./CompanyStats"
import CompanyText from "./CompanyText"

export default function CompanyDetails({ company, ecosystemName }) {
  const router = useRouter()

  if (router.isFallback || !company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#7032ff] border-t-transparent"></div>
      </div>
    )
  }

  const handleBackClick = () => {
    const url = `/ecosystems/${ecosystemName}?tab=companies`
    window.open(url, "_self")
  }

  const companyWebsite = company?.stats?.data?.find(
    (stat) => stat.label === "Website"
  )?.value

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
            src={company.logo}
            alt={`${company.name} logo`}
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

        <div>{console.log(company)}</div>

        <p className="pb-8 text-xl leading-8">{company.summary}</p>

        {company.stats && <CompanyStats stats={company.stats.data} />}

        <ScrollReveal id="foundingTeam">
          {company.foundingTeam && (
            <CompanyCardsClickable
              title={company.foundingTeam.title}
              data={company.foundingTeam.data}
            />
          )}
        </ScrollReveal>

        <ScrollReveal id="investors">
          {company.investors && (
            <CompanyCardsClickable
              title={company.investors.title}
              data={company.investors.data}
            />
          )}
        </ScrollReveal>

        <ScrollReveal id="customerGrowth">
          {company.customerGrowth && (
            <CompanyText
              title={company.customerGrowth.title}
              data={company.customerGrowth.data}
            />
          )}
        </ScrollReveal>

        <ScrollReveal id="patents">
          {company.patents && (
            <CompanyText
              title={company.patents.title}
              data={company.patents.data}
            />
          )}
        </ScrollReveal>

        <ScrollReveal id="financials">
          {company.financials && (
            <CompanyCardsNonClickable
              title={company.financials.title}
              data={company.financials.data}
            />
          )}
        </ScrollReveal>

        <ScrollReveal id="products">
          <h2 className="pb-4">{company.products?.title}</h2>
          {company.products?.data.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {company.products.data.map((product, index) => (
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
