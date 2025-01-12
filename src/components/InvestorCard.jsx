import Image from "next/image"

export default function InvestorCard({ investor }) {
  return (
    <a href={investor.link || null} target="_blank" rel="noreferrer">
      <div className="flex flex-col justify-between rounded-lg p-4 bg-[#34333d] text-[#e8e8e8]">
        <div>
          <div className="flex items-center mb-2">
            <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden">
              <Image
                src={investor.logo}
                alt={`${investor.name} logo`}
                width={64}
                height={64}
                style={{ objectFit: "contain" }}
              />
            </div>
            <h3 className="text-xl font-bold">{investor.name}</h3>
          </div>
          <span className="text-gray-400">{investor.description}</span>
        </div>
        <div className="flex mt-8 flex-col justify-end">
          <div className="flex justify-between py-1">
            <span>Type:</span>
            <span className="text-right">{investor.type}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Stages:</span>
            <span className="text-right">{investor.stages}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
