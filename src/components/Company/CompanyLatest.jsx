import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CompanyLatest({ title, data }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="mb-8">{title}</h2>
      <div className="w-full bg-[#34333d] rounded-lg p-6 shadow-lg">
        <ul className="list-disc list-inside space-y-4">
          {data &&
            data.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-[#6600cc] text-lg mt-1"
                />
                <div>
                  <span className="block text-lg font-semibold">
                    {item.label}
                  </span>
                  <p className="text-[#b8b8b8] text-base">{item.value}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
