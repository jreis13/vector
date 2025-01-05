import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ScrollReveal from "src/animations/ScrollReveal"
import CompanyCardsClickable from "./CompanyCardsClickable"
import CompanyCardsNonClickable from "./CompanyCardsNonClickable"
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
    const normalizedEcosystemName = encodeURIComponent(ecosystemName)
    router.push(`/ecosystems/${normalizedEcosystemName}`)
  }

  const companyWebsite = company?.stats?.data?.find(
    (stat) => stat.label === "Website"
  )?.value

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <div>
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
      </div>
    </div>
  )
}
