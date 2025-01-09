import Image from "next/image"

export default function InvestorCard({ investor }) {
  return (
    <div className="flex flex-col justify-between rounded-lg p-4 bg-[#34333d] text-[#e8e8e8]">
      <div>
        <div className="mb-4 flex items-center">
          <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden">
            <Image
              src={investor.logo}
              alt={`${investor.name} logo`}
              width={64}
              height={64}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{investor.name}</h3>
          </div>
        </div>
        <div className="mb-4">
          <p>{investor.summary}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-end">
        {investor.mainStats &&
          investor.mainStats.map((stat, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{stat.label}:</span>
              <span className="text-right">{stat.value}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
