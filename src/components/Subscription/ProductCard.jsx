import { CheckIcon } from "@heroicons/react/24/outline"
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react"
import { useRouter } from "next/navigation"

export default function ProductCard({
  title,
  desc,
  price,
  features,
  marked,
  type,
  onClick,
  viewLink,
}) {
  const router = useRouter()

  const handleAction = () => {
    if (type === "free") {
      window.open(viewLink || "/reports/publicReport", "_blank")
    } else {
      onClick(type)
    }
  }

  return (
    <Card
      className={`${marked ? "bg-[#6600cc]" : "bg-[#34333d]"} flex flex-col h-full justify-between`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="!m-0 p-6 flex flex-col h-full justify-between gap-4"
      >
        <div className="flex flex-col flex-grow gap-2 min-h-[80px]">
          <h5
            className={`capitalize font-semibold ${marked ? "text-[#e8e8e8]" : "text-gray-500"}`}
          >
            {title}
          </h5>
          <p
            className={`font-normal ${marked ? "text-[#e8e8e8]" : "text-gray-500"}`}
          >
            {desc}
          </p>
        </div>

        <div
          className={`mb-6 flex gap-1 justify-center items-top ${marked ? "text-[#e8e8e8]" : ""}`}
        >
          <h3 className="text-2xl font-bold">{price}</h3>
          {type === "free" && <span className="text-sm opacity-70">/free</span>}
          {type === "paid" && <span className="text-sm opacity-70">/once</span>}
          {type === "subscription" && (
            <span className="text-sm opacity-70">/month*</span>
          )}
        </div>

        <Button
          fullWidth
          size="sm"
          className={`font-inherit ${marked ? "bg-[#e8e8e8] text-[#6600cc]" : "bg-[#403f4c]"}`}
          onClick={handleAction}
        >
          {type === "free"
            ? "View Free Report"
            : type === "paid"
              ? "Get Paid Report"
              : "Subscribe Now"}
        </Button>
      </CardHeader>

      <CardBody
        className={`border-t ${marked ? "border-blue-gray-50/25" : "border-blue-gray-50"}`}
      >
        <ul className="flex flex-col gap-3">
          {features.map((option, key) => (
            <li key={key} className="flex items-center gap-3">
              <CheckIcon
                className={`h-4 w-4 ${marked ? "text-[#e8e8e8]" : ""}`}
                strokeWidth={2}
              />
              <p
                className={`text-sm font-normal ${marked ? "text-[#e8e8e8]" : ""}`}
              >
                {option}
              </p>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
