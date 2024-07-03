"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

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
        <div className="text-lg font-bold">
          Vector Score: {company.vectorScore}
        </div>
        <div>
          <button
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleBackClick}
          >
            Back to Companies
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetails
