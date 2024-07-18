import {
  faChartLine,
  faEuroSign,
  faGlobe,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const iconMapping = {
  faGlobe,
  faEuroSign,
  faChartLine,
  faPercentage,
}

function CompanyMarketSize({ marketSize }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Market Size</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {marketSize.map((market, index) => {
          const icon = iconMapping[market.icon]
          return (
            <div
              key={index}
              className="group relative flex flex-col items-center p-4"
            >
              <div className="mb-4 flex h-24 w-24 items-center justify-center">
                <FontAwesomeIcon
                  icon={icon}
                  className="text-4xl text-[#BB44F0]"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">{market.label}</h3>
                <p>{market.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CompanyMarketSize
