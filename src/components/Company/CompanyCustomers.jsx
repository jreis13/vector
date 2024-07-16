import {
  faBinoculars,
  faBuilding,
  faMedkit,
  faPlane,
  faTaxi,
  faTruck,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const iconMapping = {
  faPlane,
  faTruck,
  faMedkit,
  faBinoculars,
  faTaxi,
  faBuilding,
}

function CompanyCustomers({ customers }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Customers</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer, index) => {
          const icon = iconMapping[customer.icon]
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
                <p className="font-semibold">{customer.type}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CompanyCustomers
