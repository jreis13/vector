import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import placeholder from "public/icons/avatarIcon.svg"
import Link from "../Link"

function CompanyCardsClickable({ title, data }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="mb-4 flex h-24 w-24 items-center justify-center">
                <Image
                  src={item.photo || item.logo || placeholder}
                  alt={`${item.name} photo`}
                  width={100}
                  height={100}
                  className={
                    title === "Founding Team"
                      ? "rounded-full"
                      : "object-contain"
                  }
                />
              </div>
              <div className="text-center">
                <span className="block font-semibold">{item.name}</span>
                <p>{item.title || item.description}</p>
                {item.value && <p className="mt-2">{item.value}</p>}
              </div>
              {item.link && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-75 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <Link blank to={item.link}>
                    <FontAwesomeIcon
                      icon={
                        title === "Founding Team"
                          ? faLinkedin
                          : faExternalLinkAlt
                      }
                      className="text-2xl"
                    />
                  </Link>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default CompanyCardsClickable
