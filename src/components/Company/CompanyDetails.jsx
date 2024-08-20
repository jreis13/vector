import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "../Button"
import CompanyCardsClickable from "./CompanyCardsClickable"
import CompanyCardsNonClickable from "./CompanyCardsNonClickable"
import CompanyKeyCompetitors from "./CompanyKeyCompetitors"
import CompanyProductComparison from "./CompanyProductComparison"
import CompanyProducts from "./CompanyProducts"
import CompanyScore from "./CompanyScore"
import CompanyStats from "./CompanyStats"
import CompanyTable from "./CompanyTable"
import CompanyText from "./CompanyText"
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

        {company.customers && (
          <CompanyCardsNonClickable
            title={company.customers.title}
            data={company.customers.data}
          />
        )}

        {company.customerGrowth && (
          <CompanyText
            title={company.customerGrowth.title}
            data={company.customerGrowth.data}
          />
        )}

        {company.valueProposition && (
          <CompanyText
            title={company.valueProposition.title}
            data={company.valueProposition.data}
          />
        )}

        {company.revenueStreams && (
          <CompanyCardsNonClickable
            title={company.revenueStreams.title}
            data={company.revenueStreams.data}
          />
        )}

        {company.costStructure && (
          <CompanyTable
            title="Cost Structure"
            columns={["Fixed Costs", "Variable Costs"]}
            rows={[
              company.costStructure.data.fixed || [],
              company.costStructure.data.variable || [],
            ]}
            scalability={company.costStructure.data.scalability}
          />
        )}

        {company.marketSize && (
          <CompanyCardsNonClickable
            title={company.marketSize.title}
            data={company.marketSize.data}
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

        {company.products && <CompanyProducts products={company.products} />}

        {company.keyCompetitors && (
          <CompanyKeyCompetitors keyCompetitors={company.keyCompetitors.data} />
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
