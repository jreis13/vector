import Image from "next/image"

export default function InvestorCard({ investor }) {
  return (
    <div className="flex h-[200px] flex-col items-center justify-center p-4">
      <div className="h-16 w-16 mb-4 flex items-center justify-center overflow-hidden">
        <Image
          src={investor.logo}
          alt={`${investor.name} logo`}
          width={64}
          height={64}
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="text-center text-lg font-semibold text-white">
        {investor.name}
      </p>
    </div>
  )
}
