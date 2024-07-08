"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "./Button"
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
        <h2 className="pb-4 text-lg font-bold">Founding Team</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.foundingTeam?.map((member, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{member.label}:</span>
              {member.value}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Investors</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.investors?.map((investor, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{investor.label}:</span>
              {investor.value}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Market Size</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.marketSize?.map((market, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{market.label}:</span>
              {market.value}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Customers</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.customers?.map((customer, index) => (
            <div key={index} className="rounded-lg border p-4">
              {customer}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Value Proposition</h2>
        <p className="pb-8">{company.valueProposition || ""}</p>

        <h2 className="pb-4 text-lg font-bold">Revenue Streams</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.revenueStreams?.map((stream, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{stream.label}:</span>
              {stream.value}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Cost Structure</h2>
        <h3 className="pb-2 font-semibold">Fixed Costs</h3>
        <ul className="list-disc pb-4 pl-8">
          {company.costStructure?.fixed.map((cost, index) => (
            <li key={index}>{cost}</li>
          ))}
        </ul>
        <h3 className="pb-2 font-semibold">Variable Costs</h3>
        <ul className="list-disc pb-4 pl-8">
          {company.costStructure?.variable.map((cost, index) => (
            <li key={index}>{cost}</li>
          ))}
        </ul>
        <h3 className="pb-2 font-semibold">Scalability</h3>
        <ul className="list-disc pb-4 pl-8">
          {company.costStructure?.scalability.map((scale, index) => (
            <li key={index}>{scale}</li>
          ))}
        </ul>

        <h2 className="pb-4 text-lg font-bold">Customer Growth</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.customerGrowth?.map((growth, index) => (
            <div key={index} className="rounded-lg border p-4">
              {growth}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Patents</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.patents?.map((patent, index) => (
            <div key={index} className="rounded-lg border p-4">
              {patent}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Financials</h2>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.financials?.map((financial, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{financial.label}:</span>
              {financial.value}
            </div>
          ))}
        </div>

        <h2 className="pb-4 text-lg font-bold">Products</h2>
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Passengers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Speed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {company.products?.map((product, index) => (
              <tr key={index}>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {product.model}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {product.type}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {product.passengers}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {product.speed}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {product.range}
                </td>
                <td
                  className={`whitespace-normal break-words px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {product.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="pb-4 text-lg font-bold">Key Competitors</h2>
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Year Founded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                HQ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                # of Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Website
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Funding Amount (est)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                # of Aircrafts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {company.keyCompetitors?.map((competitor, index) => (
              <tr key={index}>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {competitor.name}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {competitor.yearFounded}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {competitor.HQ}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {competitor.employees}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  <a target="_blank" href={competitor.website}>
                    {competitor.website}
                  </a>
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {competitor.funding}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {competitor.products}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="pb-4 text-lg font-bold">Product Comparison</h2>
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead>
            <tr>
              {company.comparison?.map((competitor, index) => (
                <th
                  key={index}
                  colSpan={competitor.aircrafts.length}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                >
                  {competitor.name}
                </th>
              ))}
            </tr>
            <tr>
              {company.comparison?.map((competitor, index) =>
                competitor.aircrafts.map((aircraft, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                  >
                    {aircraft.name}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              {company.comparison?.map((competitor, index) =>
                competitor.aircrafts.map((aircraft, idx) => (
                  <td
                    key={idx}
                    className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                  >
                    {aircraft.type}
                  </td>
                ))
              )}
            </tr>
            <tr>
              {company.comparison?.map((competitor, index) =>
                competitor.aircrafts.map((aircraft, idx) => (
                  <td
                    key={idx}
                    className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                  >
                    {aircraft.function}
                  </td>
                ))
              )}
            </tr>
            <tr>
              {company.comparison?.map((competitor, index) =>
                competitor.aircrafts.map((aircraft, idx) => (
                  <td
                    key={idx}
                    className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                  >
                    {aircraft.passengers}
                  </td>
                ))
              )}
            </tr>
            <tr>
              {company.comparison?.map((competitor, index) =>
                competitor.aircrafts.map((aircraft, idx) => (
                  <td
                    key={idx}
                    className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                  >
                    {aircraft.speed}
                  </td>
                ))
              )}
            </tr>
            <tr>
              {company.comparison?.map((competitor, index) =>
                competitor.aircrafts.map((aircraft, idx) => (
                  <td
                    key={idx}
                    className={`whitespace-nowrap px-6 py-4 ${index % 2 === 0 ? "" : "bg-gray-100 text-[#403f4c]"}`}
                  >
                    {aircraft.range}
                  </td>
                ))
              )}
            </tr>
          </tbody>
        </table>
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
