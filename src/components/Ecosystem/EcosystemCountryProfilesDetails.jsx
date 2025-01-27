"use client"

import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import ScrollReveal from "src/animations/ScrollReveal"
import icons from "src/common/icons/icons"
import DynamicListCard from "./StatCards/DynamicListCard"
import InfoCard from "./StatCards/InfoCard"

export default function EcosystemCountryProfilesDetails({
  countryName,
  reports,
}) {
  const handleBackClick = () => {
    window.open(`/ecosystems/advancedairmobility?tab=countryProfiles`, "_self")
  }

  const hasHtmlType = (details) => {
    return Object.values(details).some((detail) => detail.type === "html")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-16">{countryName}</h1>

      <div className="space-y-16">
        {reports.map((report, reportIndex) => (
          <ScrollReveal key={reportIndex} id={reportIndex}>
            <div key={reportIndex}>
              <h2 className="mb-8">{report.title}</h2>
              {hasHtmlType(report.details) ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="space-y-6">
                    {Object.entries(report.details)
                      .filter(([, value]) => value.type !== "html")
                      .map(([key, value], idx) => (
                        <div
                          key={idx}
                          className="relative flex items-start gap-4 p-4 bg-[#34333d] rounded-lg"
                        >
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
                          <div className="w-full">
                            <h3 className="mb-2 text-3xl ml-6">{key}</h3>
                            {value.type === "list" ||
                            value.type === "nested-list" ? (
                              <DynamicListCard data={value} />
                            ) : (
                              <InfoCard data={value} />
                            )}
                          </div>
                          {value.source && (
                            <div className="absolute top-4 right-4 group">
                              <Image
                                src={icons.infoIcon}
                                alt="source icon"
                                width={20}
                                height={20}
                                className="cursor-pointer"
                              />
                              <div className="absolute hidden group-hover:block bg-black text-white text-sm rounded-lg p-2 w-52 z-10">
                                <p>{value.source}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  <div className="relative">
                    {Object.entries(report.details)
                      .filter(([, value]) => value.type === "html")
                      .map(([, value], idx) => (
                        <iframe
                          key={idx}
                          className="w-full h-[calc(80vh-100px)] border-none px-4 bg-[#34333d] rounded-lg"
                          src={value.value}
                          allowFullScreen
                        ></iframe>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {Object.entries(report.details).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className="relative flex items-start gap-4 p-4 bg-[#34333d] rounded-lg"
                    >
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
                      <div className="w-full">
                        <h3 className="mb-2 text-3xl mr-6">{key}</h3>
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
                            default:
                              return <InfoCard data={value} />
                          }
                        })()}
                      </div>
                      {value.source && (
                        <div className="absolute top-4 right-4 group">
                          <Image
                            src={icons.infoIcon}
                            alt="source icon"
                            width={30}
                            height={30}
                            className="cursor-pointer"
                          />
                          <div className="absolute hidden group-hover:block bg-[#e8e8e8] text-[#34333d] text-sm rounded-lg mt-2 p-2 w-40 z-10">
                            <p>{value.source}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
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
