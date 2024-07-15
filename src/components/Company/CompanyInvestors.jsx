import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import placeholder from "public/icons/avatar.svg"
import Link from "../Link"

function CompanyInvestors({ investors }) {
  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Investors</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {investors.map((investor, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
          >
            <div className="mb-4 flex h-24 w-24 items-center justify-center">
              <Image
                src={investor.logo ? investor.logo : placeholder}
                alt={`${investor.label} logo`}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <span className="font-semibold">{investor.label}</span>
              <p className="mt-2">{investor.value}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-75 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <Link blank to={investor.website}>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyInvestors
