import Image from "next/image"

export default function InvestorCard({ investor }) {
  console.log(investor)

  return (
    <a href={investor.link || "#"} target="_blank" rel="noreferrer">
      <div className="h-full flex flex-col justify-between rounded-lg p-4 bg-[#34333d] text-[#e8e8e8] hover:bg-[#e8e8e8] hover:text-[#403f4c] hover:shadow-lg transition-all duration-300">
        <div>
          <div className="flex items-center mb-2">
            <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden">
              <Image
                src={investor.logo}
                alt={`${investor.name} logo`}
                width={64}
                height={64}
                objectFit="contain"
              />
            </div>
            <h3 className="text-xl font-bold">{investor.name || "Unknown"}</h3>
          </div>
          <span className="text-gray-400">
            {investor.description || "No description available"}
          </span>
        </div>
        <div className="flex mt-8 flex-col justify-end">
          <div className="flex justify-between py-1">
            <span>Type:</span>
            <span className="text-right">
              {Array.isArray(investor.type)
                ? investor.type.join(", ")
                : investor.type || "N/A"}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Stages:</span>
            <span className="text-right">
              {Array.isArray(investor.stages)
                ? investor.stages.join(", ")
                : investor.stages || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
