import Image from "next/image"
import { useRouter } from "next/navigation"

function truncateText(text, wordLimit) {
  if (!text || typeof text !== "string") {
    return ""
  }

  const words = text.split(" ")
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."
  }
  return text
}

export default function CompanyCard({
  company,
  ecosystemName,
  isClickable = true,
}) {
  const router = useRouter()
  const descriptionLimit = 20

  const normalizeName = (name) => name.replace(/\s+/g, "").toLowerCase()

  const handleCardClick = () => {
    if (isClickable) {
      const normalizedEcosystemName = normalizeName(ecosystemName)
      const normalizedCompanyName = normalizeName(company.name)
      const url = `/ecosystems/${normalizedEcosystemName}/companies/${normalizedCompanyName}`
      window.open(url, "_blank")
    }
  }

  return (
    (<div
      className={`mb-6 flex h-full flex-col justify-between rounded-lg border p-4 transition-all duration-300 ${
        isClickable
          ? "cursor-pointer hover:bg-[#e8e8e8] hover:text-[#403f4c] hover:shadow-lg"
          : ""
      }`}
      onClick={isClickable ? handleCardClick : undefined}
    >
      <div>
        <div className="mb-4 flex items-center">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={64}
            height={64}
            className="mr-4"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <div>
            <h3 className="text-xl font-bold">{company.name}</h3>
          </div>
        </div>
        <div className="mb-4">
          <p>{truncateText(company.summary, descriptionLimit)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-end">
        <div className="mb-4">
          {company.mainStats &&
            company.mainStats.map((stat, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>{stat.label}:</span>
                <span className="text-right">{stat.value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>)
  );
}
