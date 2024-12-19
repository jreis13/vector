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

export default function CompanyCardsNonClickable({ title, data }) {
  const renderItemContent = (item) => {
    return Object.entries(item)
      .filter(
        ([key]) =>
          key !== "icon" && key !== "logo" && key !== "name" && key !== "label"
      )
      .map(([key, value]) => (
        <p key={key} className="text-center">
          {value}
        </p>
      ))
  }

  return (
    (<div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">{title}</h2>
      <div className={`grid grid-cols-1 gap-4 pb-8 md:grid-cols-2`}>
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center p-4"
            >
              <div className="mb-4 flex h-24 w-24 items-center justify-center">
                {item.icon && (
                  <FontAwesomeIcon
                    aria-hidden="true"
                    icon={iconMapping[item.icon]}
                    className="text-4xl text-[#7032ff]"
                  />
                )}
                {item.logo && (
                  <Image
                    src={`/path/to/logos/${item.logo}.svg`}
                    alt={`${item.name} logo`}
                    height={24}
                    width={24}
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold">{item.name || item.label}</h3>
                {renderItemContent(item)}
              </div>
            </div>
          ))}
      </div>
    </div>)
  );
}
