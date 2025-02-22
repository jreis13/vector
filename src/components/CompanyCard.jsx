import Image from "next/image"
import { useRouter } from "next/navigation"

function truncateText(text, wordLimit) {
  if (!text || typeof text !== "string") return ""
  const words = text.split(" ")
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text
}

export default function CompanyCard({
  company,
  ecosystemName,
  isClickable = true,
}) {
  const router = useRouter()
  const descriptionLimit = 30

  const normalizeName = (name) => name.replace(/\s+/g, "").toLowerCase()

  const handleCardClick = (event) => {
    if (isClickable) {
      const normalizedEcosystemName = normalizeName(ecosystemName)
      const normalizedCompanyName = normalizeName(company.name)
      const url = `/ecosystems/${normalizedEcosystemName}/companies/${normalizedCompanyName}`

      if (event.ctrlKey || event.metaKey || event.button === 1) {
        window.open(url, "_blank")
      } else {
        window.open(url, "_self")
      }
    }
  }

  return (
    <div
      className={`mb-6 flex h-[400px] flex-col bg-[#34333d] text-[#e8e8e8] justify-between rounded-lg p-4 transition-all duration-300 ${
        isClickable
          ? "cursor-pointer hover:bg-[#e8e8e8] hover:text-[#403f4c] hover:shadow-lg"
          : ""
      }`}
      onMouseDown={isClickable ? handleCardClick : undefined}
    >
      <div>
        <div className="mb-4 flex items-center">
          <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={64}
              height={64}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{company.name}</h3>
          </div>
        </div>
        <div className="mb-4">
          <p>{truncateText(company.summary, descriptionLimit)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-end">
        <div className="py-2">
          <div className="flex justify-between">
            <span>Industry:</span>
            <span>{company.industry}</span>
          </div>
          <div className="flex justify-between">
            <span>Funding Amount:</span>
            <span>{company.fundingAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Funding Stage:</span>
            <span>{company.fundingStage}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
