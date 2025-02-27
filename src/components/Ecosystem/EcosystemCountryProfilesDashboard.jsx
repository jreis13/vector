"use client"

import { ChevronRightIcon } from "@heroicons/react/24/outline"
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react"
import Image from "next/image"
import Link from "next/link"
import icons from "src/common/icons/icons"
import Tooltip from "../Tooltip"

export function KpiCard({ title, subtitle, country, icon, ecosystemName }) {
  const IconComponent = icons[icon] || icons["questionIcon"]

  return (
    <Card className="shadow-sm bg-[#e8e8e8] !rounded-lg h-[220px] flex flex-col">
      <CardHeader
        shadow={false}
        floated={false}
        className="!rounded-lg bg-[#e8e8e8] flex items-center w-16 h-16"
      >
        {IconComponent && (
          <Image src={IconComponent} alt={subtitle} height={48} width={48} />
        )}
      </CardHeader>
      <CardBody className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <Typography className="font-bold text-sm font-base">
            {subtitle}
          </Typography>
          <Typography
            color="blue-gray"
            className="mt-1 font-bold text-2xl font-base"
          >
            {title}
          </Typography>
          <Typography className="text-sm mt-1 font-base">
            Leading: {country || "N/A"}
          </Typography>
        </div>
        <Typography
          as={Link}
          href={
            ecosystemName && country
              ? `/ecosystems/${ecosystemName.toLowerCase().replace(/\s+/g, "")}/countries/${country}`
              : "#"
          }
          className="!font-semibold font-base text-sm mt-2 border-[#34333b] border-t pt-3 flex gap-2 items-center"
        >
          View Country Report
          <ChevronRightIcon strokeWidth={4} className="w-3 h-3" />
        </Typography>
      </CardBody>
    </Card>
  )
}

export default function EcosystemCountryProfilesDashboard({
  ecosystemName,
  metricRankings,
}) {
  const validMetrics = metricRankings?.filter((metric) => {
    if (!metric.value) return false
    const numericLabel = metric.value.toString().replace(/,/g, "").trim() // Remove commas & trim spaces
    const isNumber = !isNaN(numericLabel) // Ensure it's a valid number

    return isNumber
  })

  // Define placeholders to ensure exactly 4 cards are shown

  // Merge valid metrics with placeholders and limit to exactly 4 items
  const displayedMetrics = [...validMetrics].slice(0, 4)

  console.log(validMetrics, displayedMetrics)

  return (
    <section className="container mx-auto px-8">
      <div className="flex gap-2">
        <h2 className="flex items-start gap-2 mb-8 relative">
          Key Regional Rankings
        </h2>
        <Tooltip text="This dashboard displays the top performer in the given metric" />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-stretch gap-4">
        {displayedMetrics.map((metric, index) => (
          <KpiCard
            key={index}
            title={metric.value + (metric.unit || "")}
            subtitle={metric.metricName}
            country={metric.country}
            icon={metric.icon}
            ecosystemName={ecosystemName}
          />
        ))}
      </div>
    </section>
  )
}
