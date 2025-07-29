"use client"
import { geoMercator, geoPath } from "d3-geo"
import { useEffect, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

const EUROPE_GEOJSON = "/maps/europe-nuts2.json"

export default function RouteSelection() {
  const [nutsData, setNutsData] = useState([])
  const [groupedByCountry, setGroupedByCountry] = useState({})
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [mode, setMode] = useState("Road")
  const [cargo, setCargo] = useState("General Cargo")

  // Projection config
  const projection = geoMercator()
    .center([10, 50])
    .scale(550)
    .translate([250, 225])
  const geoGenerator = geoPath().projection(projection)

  // Load NUTS2 data and group by country
  useEffect(() => {
    fetch(EUROPE_GEOJSON)
      .then((res) => res.json())
      .then((data) => {
        const nutsRegions = data.features.map((feature) => ({
          id: feature.properties.NUTS_ID,
          name: feature.properties.NAME_LATN,
          country: feature.properties.CNTR_CODE, // 2-letter country code
          centroid: geoGenerator.centroid(feature),
        }))
        setNutsData(nutsRegions)

        // Group by country
        const grouped = nutsRegions.reduce((acc, region) => {
          if (!acc[region.country]) acc[region.country] = []
          acc[region.country].push(region)
          return acc
        }, {})
        setGroupedByCountry(grouped)
      })
  }, [])

  // Get selected region objects
  const originRegion = nutsData.find((r) => r.id === origin)
  const destinationRegion = nutsData.find((r) => r.id === destination)

  return (
    <section className="grid grid-cols-1 gap-6 rounded-lg bg-[#34333d] p-6 text-[#f5f5f5] shadow md:grid-cols-2">
      {/* LEFT: Form */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Route Selection</h2>

        {/* Origin */}
        <label className="mb-2 block text-sm font-medium">Origin</label>
        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="mb-4 w-full rounded border p-2 text-[#34333d]"
        >
          <option value="">Select origin region (NUTS2)</option>
          {Object.keys(groupedByCountry)
            .sort()
            .map((countryCode) => (
              <optgroup
                key={countryCode}
                label={countryCode} // Show country code (e.g., DE, FR)
              >
                {groupedByCountry[countryCode].map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>

        {/* Destination */}
        <label className="mb-2 block text-sm font-medium">Destination</label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mb-4 w-full rounded border p-2 text-[#34333d]"
        >
          <option value="">Select destination region (NUTS2)</option>
          {Object.keys(groupedByCountry)
            .sort()
            .map((countryCode) => (
              <optgroup key={countryCode} label={countryCode}>
                {groupedByCountry[countryCode].map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>

        {/* Transport Mode */}
        <label className="mb-2 block text-sm font-medium">Transport Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="mb-4 w-full rounded border p-2 text-[#34333d]"
        >
          <option value="Road">Road</option>
          <option value="Air">Air</option>
          <option value="Sea">Sea</option>
        </select>

        {/* Cargo Type */}
        <label className="mb-2 block text-sm font-medium">Cargo Type</label>
        <select
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="mb-4 w-full rounded border p-2 text-[#34333d]"
        >
          <option value="General Cargo">General Cargo</option>
          <option value="Perishables">Perishables</option>
          <option value="Hazardous">Hazardous</option>
        </select>
      </div>

      {/* RIGHT: Map */}
      <div className="relative flex flex-col items-center justify-center rounded bg-[#2d2c33]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [10, 50], scale: 550 }}
          width={500}
          height={450}
        >
          <Geographies geography={EUROPE_GEOJSON}>
            {({ geographies }) => (
              <>
                {/* Draw regions and highlight selected ones */}
                {geographies.map((geo) => {
                  const isOrigin = geo.properties.NUTS_ID === origin
                  const isDestination = geo.properties.NUTS_ID === destination

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        isOrigin
                          ? "#00bcd4"
                          : isDestination
                            ? "#ff5722"
                            : "#d6d6da"
                      }
                      stroke="#fff"
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#ccc", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  )
                })}

                {/* Origin & Destination Dots */}
                {originRegion && (
                  <Marker coordinates={originRegion.centroid}>
                    <circle
                      r={5}
                      fill="#00bcd4"
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  </Marker>
                )}
                {destinationRegion && (
                  <Marker coordinates={destinationRegion.centroid}>
                    <circle
                      r={5}
                      fill="#ff5722"
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  </Marker>
                )}

                {/* Animated vehicle emoji */}
                {originRegion && destinationRegion && (
                  <g>
                    <defs>
                      <path
                        id="travelPath"
                        d={`M ${originRegion.centroid[0]},${originRegion.centroid[1]} 
                            L ${destinationRegion.centroid[0]},${destinationRegion.centroid[1]}`}
                      />
                    </defs>
                    <text fontSize="22">
                      <textPath href="#travelPath" startOffset="0%">
                        <animate
                          attributeName="startOffset"
                          from="0%"
                          to="100%"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        {/* Vehicle emoji */}
                        {mode === "Road" && cargo === "General Cargo" && "🚚"}
                        {mode === "Road" && cargo === "Perishables" && "🥶🚚"}
                        {mode === "Road" && cargo === "Hazardous" && "☢️🚚"}

                        {mode === "Air" && cargo === "General Cargo" && "✈️"}
                        {mode === "Air" && cargo === "Perishables" && "🥶✈️"}
                        {mode === "Air" && cargo === "Hazardous" && "☢️✈️"}

                        {mode === "Sea" && cargo === "General Cargo" && "🚢"}
                        {mode === "Sea" && cargo === "Perishables" && "🥶🚢"}
                        {mode === "Sea" && cargo === "Hazardous" && "☢️🚢"}
                      </textPath>
                    </text>
                  </g>
                )}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>
    </section>
  )
}
