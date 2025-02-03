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
  const IconComponent = icons[icon]

  return (
    <Card className="shadow-sm bg-[#e8e8e8] !rounded-lg h-[220px] flex flex-col">
      <CardHeader
        shadow={false}
        floated={false}
        className="p-3 max-w-fit !rounded-lg bg-[#e8e8e8] flex items-center justify-center w-16 h-16"
      >
        {IconComponent && (
          <Image
            src={IconComponent}
            alt={icon}
            height={24}
            width={24}
            className="w-16 h-16"
          />
        )}
      </CardHeader>
      <CardBody className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <Typography className="font-bold font-base text-sm">
            {subtitle}
          </Typography>
          <Typography
            color="blue-gray"
            className="mt-1 font-bold font-base text-2xl"
          >
            {title}
          </Typography>
          <Typography className="text-sm font-base mt-1">
            Leading: {country}
          </Typography>
        </div>
        <Typography
          as={Link}
          href={`/ecosystems/${ecosystemName.toLowerCase().replace(/\s+/g, "")}/countries/${country.toLowerCase().replace(/\s+/g, "")}`}
          className="!font-semibold font-base text-sm mt-2 border-[#34333b] border-t pt-3 flex gap-2 items-center"
        >
          View Country Report
          <ChevronRightIcon strokeWidth={4} className="w-3 h-3" />
        </Typography>
      </CardBody>
    </Card>
  )
}

function EcosystemCountryProfilesDashboard({ ecosystemName, ecosystem }) {
  const data =
    ecosystem?.countryProfilesDashboard?.map((entry) => {
      const key = Object.keys(entry)[0]
      const { value, country, icon } = entry[key]

      return {
        title: value,
        subtitle: key,
        country: country,
        icon: icon,
      }
    }) || []

  return (
    <section className="container mx-auto px-8">
      <div className="flex gap-2">
        <h2 className="flex items-start gap-2 mb-8 relative">
          Key Regional Rankings
        </h2>
        <Tooltip
          text={"This dashboard displays the top performer in the given metric"}
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-stretch gap-4">
        {data.map((props, key) => (
          <KpiCard key={key} {...props} ecosystemName={ecosystemName} />
        ))}
      </div>
    </section>
  )
}

export default EcosystemCountryProfilesDashboard
