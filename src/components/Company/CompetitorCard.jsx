import Image from "next/image"

function CompetitorCard({ competitor }) {
  return (
    <div className="group relative flex flex-col items-center p-4">
      <div className="relative mb-4 h-24 w-24">
        <Image
          src={competitor.logo}
          alt={`${competitor.name} logo`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold">{competitor.name}</h3>
        <div className="mt-2 text-sm">
          <p>
            <strong>Year Founded:</strong> {competitor.yearFounded}
          </p>
          <p>
            <strong>HQ:</strong> {competitor.HQ}
          </p>
          <p>
            <strong># of Employees:</strong> {competitor.employees}
          </p>
          <p>
            <strong>Funding Amount:</strong> {competitor.funding}
          </p>
          <p>
            <strong># of Products:</strong> {competitor.products}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompetitorCard
