import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import placeholder from "public/icons/avatar.svg"
import Link from "../Link"

function CompanyFoundingTeam({ foundingTeam }) {
  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Founding Team</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 lg:grid-cols-3">
        {foundingTeam.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg p-4"
          >
            <div className="group relative">
              <Image
                src={member.photo ? member.photo : placeholder}
                alt={`${member.label} photo`}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-75 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <Link blank to={member.linkedin}>
                  <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                </Link>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="font-semibold">{member.label}</span>
              <p>{member.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyFoundingTeam
