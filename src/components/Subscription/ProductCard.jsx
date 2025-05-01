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
  offer,
  warning,
  onClick,
}) {
  const router = useRouter()

  const handleAction = () => {
    onClick(type)
  }

  return (
    <Card
      className={`${marked ? "bg-[#6600cc]" : "bg-[#34333d]"} flex flex-col h-full justify-between text-[#e8e8e8] shadow-lg transition-transform duration-300 hover:scale-105`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="!m-0 p-6 flex flex-col h-full justify-between gap-4"
      >
        <div className="flex flex-col flex-grow gap-2 min-h-[80px]">
          <h5 className="capitalize font-semibold text-[#e8e8e8]">{title}</h5>
          <p className="font-normal text-[#e8e8e8]">{desc}</p>
        </div>

        <div className="mb-6 flex gap-1 justify-center items-top text-[#e8e8e8]">
          <h3 className="text-2xl font-bold">{price}</h3>
          {type === "paid" && (
            <span className="text-sm opacity-70">/one time</span>
          )}
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
          {type === "paid" ? "Get Full Report" : "Subscribe Now"}
        </Button>
      </CardHeader>

      <CardBody className="border-t border-[#e8e8e8] mx-4 my-2 border-opacity-50">
        <ul className="flex flex-col gap-3">
          {features.map((option, key) => (
            <li key={key} className="flex  gap-3">
              <CheckIcon className="h-4 w-4 text-[#e8e8e8]" strokeWidth={2} />
              <p
                className={`text-sm font-normal text-left ${marked ? "text-[#e8e8e8]" : "#e8e8e8"}`}
              >
                {option}
              </p>
            </li>
          ))}
        </ul>
      </CardBody>

      {warning && (
        <span className="absolute bottom-2 right-4 text-xs text-[#e8e8e8]">
          {warning}
        </span>
      )}

      {offer && (
        <span className="absolute bottom-2 right-4 text-xs text-[#e8e8e8]">
          {offer}
        </span>
      )}
    </Card>
  )
}
