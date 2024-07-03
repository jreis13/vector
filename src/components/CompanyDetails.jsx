"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "./Button"
import arrowBack from "/public/icons/arrowBack.svg"

function truncateText(text, wordLimit) {
  const words = text.split(" ")
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."
  }
  return text
}

function CompanyDetails({ company }) {
  const router = useRouter()

  if (router.isFallback || !company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  const descriptionLimit = 20

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
        <p className="pb-8">
          {truncateText(company.summary, descriptionLimit)}
        </p>
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
          {company.stats.map((stat, index) => (
            <div key={index} className="rounded-lg border p-4">
              <span className="font-semibold">{stat.label}:</span> {stat.value}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center font-bold">
          <div>
            v/<span className="caret">^</span> Score
          </div>
          <div className="my-2 flex h-16 w-16 items-center justify-center rounded-full border bg-[#BB44F0] px-4 py-4">
            {company.vectorScore}
          </div>
        </div>
        <div className="my-4 flex max-w-fit">
          <Button onClick={handleBackClick}>
            {" "}
            <Image src={arrowBack} alt="Back" width={24} height={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetails
