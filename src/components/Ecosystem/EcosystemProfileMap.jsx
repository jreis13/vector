"use client"

import { useRouter } from "next/navigation"
import europeGeoUrl from "public/maps/europe.json"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"

export default function EcosystemCountryProfiles({
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
    <div className="flex min-h-screen relative">
      <div className="w-full max-w-[90vw] h-[80vh] mx-auto">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{ rotate: [-10, -52, 0], scale: 800 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={[10, 50]} zoom={1}>
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
                          fill: countryHasReports ? "#7032ff" : "#D6D6DA",
                          stroke: "#e8e8e8",
                          outline: "none",
                        },
                        hover: {
                          fill: countryHasReports ? "#330066" : "#D6D6DA",
                          stroke: "#e8e8e8",
                          outline: "none",
                        },
                        pressed: {
                          fill: countryHasReports ? "#7032ff" : "#D6D6DA",
                          stroke: "#e8e8e8",
                          outline: "none",
                        },
                      }}
                      title={
                        countryHasReports
                          ? `View reports for ${country}`
                          : undefined
                      } // Tooltip for clickable countries
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  )
}
