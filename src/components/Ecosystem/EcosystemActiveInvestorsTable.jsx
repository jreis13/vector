import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Typography,
} from "@material-tailwind/react"
import React, { useState } from "react"

export default function EcosystemActiveInvestorsTable({ attributes, data }) {
  const [visibleCompanies, setVisibleCompanies] = useState(
    data.map((group) => group.companyName)
  )
  const [filteredData, setFilteredData] = useState(data)
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" })

  const toggleSort = () => {
    const direction =
      sortConfig.key === "companyName" && sortConfig.direction === "asc"
        ? "desc"
        : "asc"
    setSortConfig({ key: "companyName", direction })

    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a.companyName.toLowerCase()
      const valueB = b.companyName.toLowerCase()
      return direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    })

    setFilteredData(sortedData)
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    if (!searchTerm) {
      setFilteredData(data)
      return
    }

    const filtered = data.filter(
      (group) =>
        Object.values(group).join(" ").toLowerCase().includes(searchTerm) ||
        group.investors.some((investor) =>
          Object.values(investor).join(" ").toLowerCase().includes(searchTerm)
        )
    )

    setFilteredData(filtered)
  }

  return (
    <section>
      <Card
        shadow={false}
        className="h-full w-full bg-transparent text-[#e8e8e8]"
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 bg-transparent"
        >
          <div>
            <h2 className="text-[#e8e8e8]">Active Investors</h2>
            <Typography variant="small" className="text-gray-400 font-normal">
              Past 13 months - Last updated 02/02/2025
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Filter"
                className="text-[#e8e8e8] !placeholder-[#e8e8e8] focus:!text-[#e8e8e8]"
                onChange={handleSearch}
                icon={
                  <MagnifyingGlassIcon className="h-5 w-5 text-[#e8e8e8]" />
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 mt-2 !p-0">
          <table className="w-full min-w-max table-auto text-left mb-2">
            <thead>
              <tr>
                <th
                  className="border-b border-gray-700 !p-4 text-left cursor-pointer hover:text-purple-400 transition"
                  onClick={toggleSort}
                >
                  <Typography className="text-[#e8e8e8] font-bold">
                    Company{" "}
                    {sortConfig.key === "companyName"
                      ? sortConfig.direction === "asc"
                        ? " ▲"
                        : " ▼"
                      : ""}
                  </Typography>
                </th>
                <th className="border-b border-gray-700 !p-4">
                  <Typography className="text-[#e8e8e8] font-bold">
                    Investor
                  </Typography>
                </th>
                <th className="border-b border-gray-700 !p-4">
                  <Typography className="text-[#e8e8e8] font-bold">
                    Funding Round
                  </Typography>
                </th>
                <th className="border-b border-gray-700 !p-4">
                  <Typography className="text-[#e8e8e8] font-bold">
                    Lead Investor
                  </Typography>
                </th>
                <th className="border-b border-gray-700 !p-4">
                  <Typography className="text-[#e8e8e8] font-bold">
                    Amount
                  </Typography>
                </th>
                <th className="border-b border-gray-700 !p-4">
                  <Typography className="text-[#e8e8e8] font-bold">
                    Date
                  </Typography>
                </th>
                <th className="border-b border-gray-700 !p-4">
                  <Typography className="text-[#e8e8e8] font-bold">
                    Comments
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((group, groupIndex) => (
                <React.Fragment key={group.companyName}>
                  <tr
                    className={`${groupIndex % 2 === 0 ? "bg-transparent" : "bg-[#34333b]"} text-[#e8e8e8]`}
                  >
                    <td
                      className="!p-4 text-center font-semibold text-[#e8e8e8]"
                      rowSpan={group.investors.length + 1}
                    >
                      {group.companyName}
                    </td>
                  </tr>
                  {group.investors.map((investor, index) => (
                    <tr
                      key={`${group.companyName}-${index}`}
                      className={`${groupIndex % 2 === 0 ? "bg-transparent" : "bg-[#34333b]"} text-[#e8e8e8]`}
                    >
                      <td className="!p-4">{investor.name || "N/A"}</td>
                      <td className="!p-4">{investor.fundingRound || "N/A"}</td>
                      <td className="!p-4">
                        <Chip
                          size="sm"
                          value={investor.leadInvestor === "Yes" ? "Yes" : "No"}
                          color={
                            investor.leadInvestor === "Yes" ? "green" : "red"
                          }
                        />
                      </td>
                      <td className="!p-4">
                        {investor.amount || "Unspecified"}
                      </td>
                      <td className="!p-4">{investor.date || "N/A"}</td>
                      <td className="!p-4">{investor.comments || "N/A"}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
  )
}
