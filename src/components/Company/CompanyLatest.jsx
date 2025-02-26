import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CompanyLatest({ title, data }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="mb-8 text-3xl font-bold">{title}</h2>
      <div className="w-full bg-[#34333d] rounded-lg p-6 shadow-lg">
        {Array.isArray(data) && data.length > 0 ? (
          <ul className="space-y-4">
            {data.flatMap((item, index) => {
              const text = item.name || ""
              return text.split(";").map((entry, subIndex) => {
                const trimmedEntry = entry.trim()
                const [label, description] = trimmedEntry
                  .split(" - ")
                  .map((s) => s.trim())

                return (
                  <li
                    key={`${index}-${subIndex}`}
                    className="flex items-start space-x-4 rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-[#6600cc] text-lg mt-1"
                    />
                    <div>
                      <p className="block text-2xl font-semibold">{label}</p>
                      <p className="text-[#b8b8b8]">{description}</p>
                    </div>
                  </li>
                )
              })
            })}
          </ul>
        ) : (
          <p className="text-[#b8b8b8] text-lg text-center">
            No developments to report at the moment.
          </p>
        )}
      </div>
    </div>
  )
}
