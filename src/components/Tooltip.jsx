import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Tooltip({
  text,
  iconColor = "#6600cc",
  tooltipBg = "#34333b",
}) {
  return (
    <p className="relative group inline-block h-max">
      <FontAwesomeIcon
        icon={faInfoCircle}
        className={`text-sm  cursor-pointer text-[${iconColor}]`}
      />
      <span
        className={`absolute top-1/2 ml-2 left-full ml-1 hidden group-hover:block text-sm rounded py-1 px-2 w-max transform -translate-y-1/2`}
        style={{ backgroundColor: tooltipBg }}
      >
        {text}
      </span>
    </p>
  )
}
