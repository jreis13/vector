import Image from "next/image"
import { useRouter } from "next/navigation"
import CompanyCardsClickable from "./CompanyCardsClickable"
import CompanyCardsNonClickable from "./CompanyCardsNonClickable"
import CompanyStats from "./CompanyStats"
import CompanyText from "./CompanyText"

function CompanyDetails({ company, ecosystemName }) {
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

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <div>
        <div className="pb-8">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={96}
            height={96}
          />
        </div>

        <p className="pb-8">{company.summary}</p>

        {company.stats && <CompanyStats stats={company.stats.data} />}

        {company.foundingTeam && (
          <CompanyCardsClickable
            title={company.foundingTeam.title}
            data={company.foundingTeam.data}
          />
        )}

        {company.investors && (
          <CompanyCardsClickable
            title={company.investors.title}
            data={company.investors.data}
          />
        )}

        {company.customerGrowth && (
          <CompanyText
            title={company.customerGrowth.title}
            data={company.customerGrowth.data}
          />
        )}

        {company.patents && (
          <CompanyText
            title={company.patents.title}
            data={company.patents.data}
          />
        )}

        {company.financials && (
          <CompanyCardsNonClickable
            title={company.financials.title}
            data={company.financials.data}
          />
        )}
      </div>
    </div>
  )
}

export default CompanyDetails
