"use client"

import { AnimatePresence, motion } from "framer-motion"
import europeGeoUrl from "public/maps/europe.json"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

export default function EcosystemInfrastructure({ ecosystem = {} }) {
  const vertiports = ecosystem?.vertiports || {}

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryVertiports, setCountryVertiports] = useState([])
  const [projectionConfig, setProjectionConfig] = useState({
    center: [0, 0],
    scale: 800,
  })

  useEffect(() => {
    const appRoot = document.getElementById("__next")
    if (appRoot) {
      Modal.setAppElement("#__next")
    }
  }, [])

  const hasVertiports = (countryName) => {
    return vertiports[countryName]
  }

  const calculateMidpoint = (coordinates) => {
    if (coordinates.length === 0) return [0, 0]

    const total = coordinates.reduce(
      (acc, [lng, lat]) => {
        acc.lng += lng
        acc.lat += lat
        return acc
      },
      { lng: 0, lat: 0 }
    )
    const count = coordinates.length
    return [total.lng / count, total.lat / count]
  }

  const adjustForProjection = (coordinates) => {
    const [lng, lat] = coordinates
    const rotation = [-10, -52]
    return [lng + rotation[0], lat + rotation[1]]
  }

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.name
    const vertiportsInCountry = vertiports[countryName]

    if (vertiportsInCountry) {
      const coordinates = vertiportsInCountry.map((v) => v.coordinates)
      const midpoint = calculateMidpoint(coordinates)
      const adjustedMidpoint = adjustForProjection(midpoint)

      setSelectedCountry(countryName)
      setCountryVertiports(vertiportsInCountry)
      setProjectionConfig({
        center: adjustedMidpoint,
        scale: 2000,
      })
    }
  }

  const resetZoom = () => {
    setSelectedCountry(null)
    setCountryVertiports([])
    setProjectionConfig({
      center: [0, 0],
      scale: 800,
    })
  }

  const handleMapClick = (event) => {
    const isCountry = event.target.closest(".clickable-country")
    if (!isCountry) {
      resetZoom()
    }
  }

  return (
    <div className="flex min-h-screen relative" onClick={handleMapClick}>
      <div className="w-full max-w-[90vw] h-[80vh] mx-auto">
        <AnimatePresence>
          <motion.div
            key={selectedCountry || "initialMap"}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{
                rotate: [-10, -52, 0],
                scale: projectionConfig.scale,
                center: projectionConfig.center,
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={europeGeoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name
                    const countryHasVertiports = hasVertiports(countryName)

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() =>
                          countryHasVertiports && handleCountryClick(geo)
                        }
                        className={
                          countryHasVertiports
                            ? "clickable-country cursor-pointer"
                            : "cursor-default"
                        }
                        style={{
                          default: {
                            fill: countryHasVertiports ? "#7032ff" : "#D6D6DA",
                            stroke: "#e8e8e8",
                            outline: "none",
                          },
                          hover: {
                            fill: countryHasVertiports ? "#330066" : "#D6D6DA",
                            stroke: "#e8e8e8",
                            outline: "none",
                          },
                          pressed: {
                            fill: countryHasVertiports ? "#7032ff" : "#D6D6DA",
                            stroke: "#e8e8e8",
                            outline: "none",
                          },
                        }}
                      />
                    )
                  })
                }
              </Geographies>
              {countryVertiports.map((vertiport, index) => (
                <motion.g
                  key={index}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                >
                  <Marker coordinates={vertiport.coordinates}>
                    <circle r={5} fill="#F53" />
                    <text
                      textAnchor="middle"
                      y={-10}
                      style={{
                        fontFamily: "system-ui",
                        fill: "#5D5A6D",
                        fontSize: 12,
                      }}
                    >
                      {vertiport.name}
                    </text>
                  </Marker>
                </motion.g>
              ))}
            </ComposableMap>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
