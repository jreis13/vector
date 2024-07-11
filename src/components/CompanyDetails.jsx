"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "./Button"
import CompetitorCard from "./CompetitorCard"
import ProductChart from "./ProductChart"
import ProductComparisonChart from "./ProductComparisonChart"
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

        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.stats.map((stat, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{stat.label}:</span> {stat.value}
            </div>
          ))}
        </div>

        {company.foundingTeam && (
          <div className="flex min-h-screen flex-col py-8 lg:py-16">
            <h2 className="pb-4 text-lg font-bold">Founding Team</h2>
            <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
              {company.foundingTeam.map((member, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <span className="font-semibold">{member.label}:</span>
                  {member.value}
                </div>
              ))}
            </div>
          </div>
        )}

        {company.investors && (
          <div className="flex min-h-screen flex-col py-8 lg:py-16">
            <h2 className="pb-4 text-lg font-bold">Investors</h2>
            <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
              {company.investors.map((investor, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <span className="font-semibold">{investor.label}:</span>
                  {investor.value}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex min-h-screen flex-col py-8 lg:py-16">
          {company.customers && (
            <>
              <h2 className="pb-4 text-lg font-bold">Customers</h2>
              <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
                {company.customers.map((customer, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    {customer}
                  </div>
                ))}
              </div>
            </>
          )}
          {company.customerGrowth && (
            <>
              <h2 className="pb-4 text-lg font-bold">Customer Growth</h2>
              <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
                {company.customerGrowth.map((growth, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    {growth}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {company.valueProposition && (
          <div className="flex min-h-screen flex-col py-8 lg:py-16">
            <h2 className="pb-4 text-lg font-bold">Value Proposition</h2>
            <p className="pb-8">{company.valueProposition}</p>
          </div>
        )}

        {company.revenueStreams && (
          <div className="flex min-h-screen flex-col py-8 lg:py-16">
            <h2 className="pb-4 text-lg font-bold">Revenue Streams</h2>
            <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
              {company.revenueStreams.map((stream, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <span className="font-semibold">{stream.label}:</span>
                  {stream.value}
                </div>
              ))}
            </div>
          </div>
        )}

        {company.costStructure && (
          <div className="flex min-h-screen flex-col py-8 lg:py-16">
            <h2 className="pb-4 text-lg font-bold">Cost Structure</h2>
            <h3 className="pb-2 font-semibold">Fixed Costs</h3>
            <ul className="list-disc pb-4 pl-8">
              {company.costStructure.fixed.map((cost, index) => (
                <li key={index}>{cost}</li>
              ))}
            </ul>
            <h3 className="pb-2 font-semibold">Variable Costs</h3>
            <ul className="list-disc pb-4 pl-8">
              {company.costStructure.variable.map((cost, index) => (
                <li key={index}>{cost}</li>
              ))}
            </ul>
            <h3 className="pb-2 font-semibold">Scalability</h3>
            <ul className="list-disc pb-4 pl-8">
              {company.costStructure.scalability.map((scale, index) => (
                <li key={index}>{scale}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex min-h-screen flex-col py-8 lg:py-16">
          {company.marketSize && (
            <>
              <h2 className="pb-4 text-lg font-bold">Market Size</h2>
              <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
                {company.marketSize.map((market, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <span className="font-semibold">{market.label}:</span>
                    {market.value}
                  </div>
                ))}
              </div>

              {company.patents && (
                <>
                  <h2 className="pb-4 text-lg font-bold">Patents</h2>
                  <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
                    {company.patents.map((patent, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        {patent}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {company.financials && (
            <>
              <h2 className="pb-4 text-lg font-bold">Financials</h2>
              <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
                {company.financials.map((financial, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <span className="font-semibold">{financial.label}:</span>
                    {financial.value}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {company.products && (
          <div className="flex min-h-screen flex-col py-8 lg:py-16">
            <h2 className="pb-4 text-lg font-bold">Products</h2>
            <ProductChart products={company.products} />
          </div>
        )}

        <div className="flex min-h-screen flex-col py-8 lg:py-16">
          {company.keyCompetitors && (
            <>
              <h2 className="pb-4 text-lg font-bold">Key Competitors</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {company.keyCompetitors.map((competitor, index) => (
                  <CompetitorCard key={index} competitor={competitor} />
                ))}
              </div>
            </>
          )}

          {company.comparison && (
            <>
              <h2 className="pb-4 text-lg font-bold">Product Comparison</h2>
              <ProductComparisonChart comparison={company.comparison} />
            </>
          )}
        </div>

        <div className="my-4 flex flex-col items-center font-bold">
          <div>
            v/<span className="caret">^</span> Score
          </div>
          <div className="my-2 flex h-16 w-16 items-center justify-center rounded-full border bg-[#BB44F0] px-4 py-4">
            {company.vectorScore}
          </div>
        </div>
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
