"use client"

import { useRouter } from "next/navigation"
import europeGeoUrl from "public/maps/europe.json"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import Tooltip from "../Tooltip"

export default function EcosystemCountryProfilesMap({
  countryReports,
  ecosystemName,
}) {
  const router = useRouter()

  const groupedCountryReports = Object.keys(countryReports).reduce(
    (acc, country) => {
      acc[country.toLowerCase().trim()] = countryReports[country]
      return acc
    },
    {}
  )

  const hasCountryReports = (countryName) => {
    return groupedCountryReports[countryName?.toLowerCase().trim()]
  }

  const handleCountryClick = (geo) => {
    const { name } = geo.properties

    if (!name) return

    const reports = groupedCountryReports[name.toLowerCase().trim()]
    if (reports && ecosystemName) {
      const sanitizedEcosystemName = ecosystemName
        .replace(/\s+/g, "")
        .toLowerCase()
      const sanitizedCountryName = name.replace(/\s+/g, "").toLowerCase()
      router.push(
        `/ecosystems/${sanitizedEcosystemName}/countries/${sanitizedCountryName}`
      )
    }
  }

  return (
    <section className="flex flex-col mb-16 relative container mx-auto px-8">
      <div className="flex gap-2">
        <h2 className="flex items-start gap-2 mb-8 relative">
          Covered countries
        </h2>
        <Tooltip
          text={"Click on the country to navigate to the country profile"}
        />
      </div>
      <div className="map-container w-full max-w-[90vw] h-[70vh] mx-auto overflow-hidden">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-10, -52, 0],
            scale: 1000,
            center: [0, 0],
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <g>
            <Geographies geography={europeGeoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = geo.properties.name
                  const countryHasReports = hasCountryReports(country)

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() =>
                        countryHasReports && handleCountryClick(geo)
                      }
                      className={
                        countryHasReports
                          ? "cursor-pointer clickable-country"
                          : "cursor-default"
                      }
                      style={{
                        default: {
                          fill: countryHasReports ? "#6600cc" : "#D6D6DA",
                          stroke: "#e8e8e8",
                          outline: "none",
                        },
                        hover: {
                          fill: countryHasReports ? "#330066" : "#D6D6DA",
                          stroke: "#e8e8e8",
                          outline: "none",
                        },
                        pressed: {
                          fill: countryHasReports ? "#6600cc" : "#D6D6DA",
                          stroke: "#e8e8e8",
                          outline: "none",
                        },
                      }}
                      title={
                        countryHasReports
                          ? `View reports for ${country}`
                          : undefined
                      }
                    />
                  )
                })
              }
            </Geographies>
          </g>
        </ComposableMap>
      </div>
    </section>
  )
}
