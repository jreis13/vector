"use client"

import { useRouter } from "next/navigation"
import europeGeoUrl from "public/maps/europe.json"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import Tooltip from "../Tooltip"

export default function EcosystemCountryProfilesMap({
  countryProfiles,
  ecosystemName,
}) {
  const router = useRouter()

  const hasCountryProfile = (countryName) => {
    return countryProfiles?.some(
      (profile) =>
        profile.countryName.toLowerCase() === countryName.toLowerCase()
    )
  }

  const handleCountryClick = (geo) => {
    const { name } = geo.properties
    if (hasCountryProfile(name)) {
      router.push(
        `/ecosystems/${ecosystemName.toLowerCase().replace(/\s+/g, "")}/countries/${name.toLowerCase().replace(/\s+/g, "")}`
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
                  const countryHasProfile = hasCountryProfile(country)

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() =>
                        countryHasProfile && handleCountryClick(geo)
                      }
                      className={
                        countryHasProfile
                          ? "cursor-pointer clickable-country"
                          : "cursor-default"
                      }
                      style={{
                        default: {
                          fill: countryHasProfile ? "#6600cc" : "#D6D6DA",
                          stroke: "#e8e8e8",
                        },
                        hover: {
                          fill: countryHasProfile ? "#330066" : "#D6D6DA",
                          stroke: "#e8e8e8",
                        },
                        pressed: {
                          fill: countryHasProfile ? "#6600cc" : "#D6D6DA",
                          stroke: "#e8e8e8",
                        },
                      }}
                      title={
                        countryHasProfile
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
