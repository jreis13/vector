"use client"

import europeGeoUrl from "public/maps/europe.json"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

export default function EcosystemInfrastructure({ ecosystem = {} }) {
  const vertiports = ecosystem?.vertiports || {}

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryVertiports, setCountryVertiports] = useState([])
  const [zoomConfig, setZoomConfig] = useState({
    center: [10, 50],
    zoom: 1,
  })
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const appRoot = document.getElementById("__next")
    if (appRoot) {
      Modal.setAppElement("#__next")
    }
  }, [])

  const groupedVertiportsByCountry = Object.keys(vertiports).reduce(
    (acc, country) => {
      acc[country.toLowerCase().trim()] = vertiports[country]
      return acc
    },
    {}
  )

  const hasVertiports = (countryName) => {
    return groupedVertiportsByCountry[countryName.toLowerCase().trim()]
  }

  const handleCountryClick = (geo) => {
    const { name } = geo.properties
    const vertiportsInCountry =
      groupedVertiportsByCountry[name.toLowerCase().trim()]

    if (vertiportsInCountry) {
      const targetCenter = calculateCenter(
        vertiportsInCountry.map((v) => v.coordinates)
      )
      setSelectedCountry(name)
      setCountryVertiports(vertiportsInCountry)
      smoothZoom(targetCenter, 4) // Smooth zoom into the country
    }
  }

  const resetZoom = () => {
    setSelectedCountry(null)
    setCountryVertiports([])
    smoothZoom([10, 50], 1) // Smooth zoom to default
  }

  const calculateCenter = (coordinatesList) => {
    const total = coordinatesList.reduce(
      (acc, [lng, lat]) => {
        acc.lng += lng
        acc.lat += lat
        return acc
      },
      { lng: 0, lat: 0 }
    )
    const count = coordinatesList.length
    return [total.lng / count, total.lat / count]
  }

  const smoothZoom = (targetCenter, targetZoom) => {
    if (transitioning) return
    setTransitioning(true)

    const duration = 500 // Total duration in milliseconds
    const steps = 20 // Number of steps for the transition
    const interval = duration / steps

    const [currentLng, currentLat] = zoomConfig.center
    const currentZoom = zoomConfig.zoom
    const [targetLng, targetLat] = targetCenter

    const stepLng = (targetLng - currentLng) / steps
    const stepLat = (targetLat - currentLat) / steps
    const stepZoom = (targetZoom - currentZoom) / steps

    let step = 0
    const zoomInterval = setInterval(() => {
      step++
      setZoomConfig((prev) => ({
        center: [prev.center[0] + stepLng, prev.center[1] + stepLat],
        zoom: prev.zoom + stepZoom,
      }))

      if (step >= steps) {
        clearInterval(zoomInterval)
        setTransitioning(false)
      }
    }, interval)
  }

  return (
    <div className="flex min-h-screen relative">
      <button
        onClick={resetZoom}
        className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded z-10"
      >
        Reset
      </button>
      <div className="w-full max-w-[90vw] h-[80vh] mx-auto">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{ rotate: [-10, -52, 0], scale: 800 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={zoomConfig.center} zoom={zoomConfig.zoom}>
            <Geographies geography={europeGeoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = geo.properties.name
                  const countryHasVertiports = hasVertiports(country)

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() =>
                        countryHasVertiports && handleCountryClick(geo)
                      }
                      className={
                        countryHasVertiports
                          ? "cursor-pointer"
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
            {selectedCountry &&
              countryVertiports.map((vertiport, index) => (
                <Marker key={index} coordinates={vertiport.coordinates}>
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
              ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  )
}
