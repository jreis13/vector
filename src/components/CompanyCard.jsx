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

function CompanyCard({ company }) {
  const router = useRouter()
  const descriptionLimit = 20

  const handleCardClick = () => {
    router.push(`/companies/${company.name.replace(/\s+/g, "").toLowerCase()}`)
  }

  return (
    <div
      className="mb-6 flex h-full cursor-pointer flex-col justify-between rounded-lg border p-4 transition-shadow duration-200 hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div>
        <div className="mb-4 flex items-center">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={48}
            height={48}
            className="mr-4"
          />
          <div>
            <h3 className="text-xl font-bold">{company.name}</h3>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">
            {truncateText(company.summary, descriptionLimit)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-end">
        <div className="mb-4">
          {company.stats.map((stat, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{stat.label}:</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-lg font-bold">
            v/<span className="caret">^</span> Score: {company.vectorScore}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard
