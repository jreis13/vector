import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "../Link"

function CompetitorCard({ competitor }) {
  const handleCardClick = () => {
    window.open(competitor.website, "_blank")
  }

  return (
    <div
      className="group relative flex flex-col items-center rounded-lg p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
      onClick={handleCardClick}
    >
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
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-75 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <Link blank to={competitor.website}>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </Link>
      </div>
    </div>
  )
}

export default CompetitorCard
