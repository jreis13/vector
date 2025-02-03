"use client"

import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import ScrollReveal from "src/animations/ScrollReveal"
import icons from "src/common/icons/icons"
import Breadcrumb from "../Breadcrumb"
import DynamicListCard from "./StatCards/DynamicListCard"
import DynamicTransportTable from "./StatCards/DynamicTable"
import InfoCard from "./StatCards/InfoCard"

export default function EcosystemCountryProfilesDetails({
  countryName,
  reports,
}) {
  const handleBackClick = () => {
    window.open(`/ecosystems/advancedairmobility?tab=countryProfiles`, "_self")
  }

  const breadcrumbSections = reports.map((report) => ({
    title: report.title,
    icon: icons[report.icon] || "/public/icons/defaultIcon.svg",
    id: report.title.toLowerCase().replace(/ /g, "-"),
  }))

  const hasHtmlType = (details) => {
    return Object.values(details).some((detail) => detail.type === "html")
  }

  return (
    <div className="container mx-auto py-8 relative">
      <Breadcrumb sections={breadcrumbSections} />
      <h1 className="text-4xl font-bold mb-16">{countryName}</h1>

      <div className="space-y-16">
        {reports.map((report, reportIndex) => {
          const isFirst = reportIndex === 0
          const isLast = reportIndex === reports.length - 1

          return (
            <ScrollReveal
              key={reportIndex}
              id={breadcrumbSections[reportIndex].id}
              isFirst={isFirst}
              isLast={isLast}
            >
              <div id={breadcrumbSections[reportIndex].id}>
                <h2 className="mb-8">{report.title}</h2>

                {hasHtmlType(report.details) ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="space-y-6">
                      {Object.entries(report.details)
                        .filter(([, value]) => value.type !== "html")
                        .map(([key, value], idx, arr) => (
                          <div
                            key={idx}
                            className={`relative flex flex-col h-full items-start gap-4 p-4 bg-[#34333d] rounded-lg ${
                              idx === arr.length - 1 ? "col-span-full" : ""
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0">
                                {value.icon ? (
                                  <Image
                                    src={icons[value.icon]}
                                    alt={value.subtitle || "icon"}
                                    width={40}
                                    height={40}
                                  />
                                ) : value.logo ? (
                                  <Image
                                    src={value.logo}
                                    alt={value.subtitle}
                                    width={40}
                                    height={40}
                                  />
                                ) : null}
                              </div>
                              <h3 className="mb-2 text-3xl ml-6">{key}</h3>
                            </div>
                            <div className="w-full">
                              {value.type === "list" ||
                              value.type === "nested-list" ? (
                                <DynamicListCard data={value} />
                              ) : (
                                <InfoCard data={value} />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {Object.entries(report.details)
                      .filter(([, value]) => value.type !== "html")
                      .map(([key, value], idx, arr) => (
                        <div
                          key={idx}
                          className={`relative flex flex-col h-full items-start gap-4 p-4 bg-[#34333d] rounded-lg ${
                            arr.length % 2 !== 0 && idx === arr.length - 1
                              ? "col-span-full"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {value.icon ? (
                                <Image
                                  src={icons[value.icon]}
                                  alt={value.subtitle || "icon"}
                                  width={80}
                                  height={80}
                                  className="w-20 h-20 object-contain"
                                />
                              ) : value.logo ? (
                                <Image
                                  src={value.logo}
                                  alt={value.subtitle}
                                  width={80}
                                  height={80}
                                  className="w-20 h-20 object-contain"
                                />
                              ) : null}
                            </div>
                            <h3 className="mb-2 text-3xl mr-6">{key}</h3>
                          </div>
                          <div className="w-full">
                            {(() => {
                              switch (value.type) {
                                case "list":
                                case "nested-list":
                                  return <DynamicListCard data={value} />
                                case "html":
                                  return (
                                    <div className="relative">
                                      <iframe
                                        className="w-full h-full border-none"
                                        src={value.value}
                                        allowFullScreen
                                      ></iframe>
                                    </div>
                                  )
                                case "number":
                                  return <InfoCard data={value} />
                                case "table":
                                  return (
                                    <DynamicTransportTable
                                      reports={reports}
                                      countryName={countryName}
                                    />
                                  )
                                default:
                                  return <InfoCard data={value} />
                              }
                            })()}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      <button
        onClick={handleBackClick}
        className="text-4xl fixed bottom-20 p-8 left-4"
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
    </div>
  )
}
