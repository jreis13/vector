import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "../Button"
import CompanyCostStructure from "./CompanyCostStructure"
import CompanyCustomerGrowth from "./CompanyCustomerGrowth"
import CompanyCustomers from "./CompanyCustomers"
import CompanyFinancials from "./CompanyFinancials"
import CompanyFoundingTeam from "./CompanyFoundingTeam"
import CompanyInvestors from "./CompanyInvestors"
import CompanyKeyCompetitors from "./CompanyKeyCompetitors"
import CompanyMarketSize from "./CompanyMarketSize"
import CompanyPatents from "./CompanyPatents"
import CompanyProductComparison from "./CompanyProductComparison"
import CompanyProducts from "./CompanyProducts"
import CompanyRevenueStreams from "./CompanyRevenueStreams"
import CompanyScore from "./CompanyScore"
import CompanyStats from "./CompanyStats"
import CompanyValueProposition from "./CompanyValueProposition"
import arrowBack from "/public/icons/arrowBack.svg"

function CompanyDetails({ company }) {
  const router = useRouter()

  if (router.isFallback || !company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  const handleBackClick = () => {
    router.push("/companies")
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

        {company.stats && <CompanyStats stats={company.stats} />}

        {company.foundingTeam && (
          <CompanyFoundingTeam foundingTeam={company.foundingTeam} />
        )}

        {company.investors && (
          <CompanyInvestors investors={company.investors} />
        )}

        {company.customers && (
          <CompanyCustomers customers={company.customers} />
        )}

        {company.customerGrowth && (
          <CompanyCustomerGrowth customerGrowth={company.customerGrowth} />
        )}

        {company.valueProposition && (
          <CompanyValueProposition
            valueProposition={company.valueProposition}
          />
        )}

        {company.revenueStreams && (
          <CompanyRevenueStreams revenueStreams={company.revenueStreams} />
        )}

        {company.costStructure && (
          <CompanyCostStructure costStructure={company.costStructure} />
        )}

        {company.marketSize && (
          <CompanyMarketSize marketSize={company.marketSize} />
        )}

        {company.patents && <CompanyPatents patents={company.patents} />}

        {company.financials && (
          <CompanyFinancials financials={company.financials} />
        )}

        {company.products && <CompanyProducts products={company.products} />}

        {company.keyCompetitors && (
          <CompanyKeyCompetitors keyCompetitors={company.keyCompetitors} />
        )}

        {company.comparison && (
          <CompanyProductComparison comparison={company.comparison} />
        )}

        <CompanyScore vectorScore={company.vectorScore} />

        <div className="mx-auto my-4 flex max-w-fit lg:mx-0">
          <Button onClick={handleBackClick}>
            <Image src={arrowBack} alt="Back" width={24} height={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetails
