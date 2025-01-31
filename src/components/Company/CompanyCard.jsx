import {
  faBalanceScale,
  faBinoculars,
  faBuilding,
  faChalkboardTeacher,
  faChartLine,
  faDollarSign,
  faEuroSign,
  faExchangeAlt,
  faFire,
  faGlobe,
  faHandHoldingUsd,
  faHandshake,
  faMedkit,
  faMoneyBill,
  faMoneyCheckAlt,
  faPercentage,
  faPiggyBank,
  faPlane,
  faTaxi,
  faTools,
  faTruck,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import placeholder from "public/icons/avatarIcon.svg"

const iconMapping = {
  faPlane,
  faTruck,
  faMedkit,
  faBinoculars,
  faTaxi,
  faBuilding,
  faExchangeAlt,
  faTools,
  faHandshake,
  faChalkboardTeacher,
  faGlobe,
  faEuroSign,
  faChartLine,
  faPercentage,
  faBalanceScale,
  faFire,
  faHandHoldingUsd,
  faPiggyBank,
  faDollarSign,
  faMoneyBill,
  faMoneyCheckAlt,
}

export default function CompanyCard({ title, data }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="mb-8">{title}</h2>
      <div className="grid place-items-center gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {data &&
          data.map((item, index) => (
            <div key={index} className="w-[400px] h-full">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col"
                >
                  <CardContent item={item} title={title} />
                </a>
              ) : (
                <div className="flex flex-col">
                  <CardContent item={item} title={title} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

function CardContent({ item, title }) {
  return (
    <div className="group w-full h-[250px] relative flex flex-col items-center bg-[#34333d] rounded-lg p-4">
      <div className="mb-4 flex h-24 w-24 items-center justify-center">
        {item.icon ? (
          <FontAwesomeIcon
            aria-hidden="true"
            icon={iconMapping[item.icon]}
            className="text-4xl text-[#7032ff]"
          />
        ) : (
          <Image
            src={item.photo || item.logo || placeholder}
            alt={`${item.name} photo`}
            width={100}
            height={100}
            objectFit={title === "Founding Team" ? undefined : "contain"}
          />
        )}
      </div>
      <div className="text-center">
        <span className="block font-semibold text-xl">{item.name}</span>
        <p className="text-[#b8b8b8] text-lg font-medium">
          {item.title || item.description}
        </p>
        {item.value && (
          <p className="mt-2 text-xl font-semibold">{item.value}</p>
        )}
      </div>
    </div>
  )
}
