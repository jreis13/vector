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
          {company.mainStats.map((stat, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{stat.label}:</span> {stat.value}
            </div>
          ))}
          {company.stats.map(
            (stat, index) =>
              !company.mainStats.some(
                (mainStat) => mainStat.label === stat.label
              ) && (
                <div key={index} className="rounded-lg border p-4">
                  <span className="font-semibold">{stat.label}:</span>{" "}
                  {stat.value}
                </div>
              )
          )}
        </div>
        <div className="flex flex-col items-center font-bold">
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
