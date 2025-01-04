import L from "leaflet"
import "leaflet/dist/leaflet.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

const createCustomIcon = () =>
  L.divIcon({
    className: "custom-icon",
    html: `<img src="/icons/pinIcon.svg" alt="pin" style="width: 30px; height: 30px;" />`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })

const fetchCoordinates = async (country) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
    )
    const data = await response.json()
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
    }
  } catch (error) {
    console.error("Error fetching coordinates for", country, error)
  }
  return null
}

const adjustCoordinates = (coordinates, index, total) => {
  if (!coordinates) return null
  const [lat, lon] = coordinates

  const offset = 0.05 * (index + 1)
  const angle = (360 / total) * index

  const adjustedLat = lat + offset * Math.cos((angle * Math.PI) / 180)
  const adjustedLon = lon + offset * Math.sin((angle * Math.PI) / 180)

  return [adjustedLat, adjustedLon]
}

export default function EcosystemMap({ companies }) {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllCoordinates = async () => {
      const results = await Promise.all(
        companies.map(async (company) => {
          if (company.country) {
            const coordinates = await fetchCoordinates(company.country)
            return { ...company, coordinates }
          }
          return { ...company, coordinates: null }
        })
      )

      const groupedResults = results.reduce((acc, company) => {
        const { coordinates, country } = company
        if (!coordinates) return acc
        if (!acc[country]) acc[country] = []
        acc[country].push(company)
        return acc
      }, {})

      const adjustedLocations = Object.values(groupedResults).flatMap(
        (companiesInCountry) =>
          companiesInCountry.map((company, index) => ({
            ...company,
            coordinates: adjustCoordinates(
              company.coordinates,
              index,
              companiesInCountry.length
            ),
          }))
      )

      setLocations(adjustedLocations)
      setLoading(false)
    }

    fetchAllCoordinates()
  }, [companies])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#7032ff] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <MapContainer center={[20, 0]} zoom={2}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((company) => {
        const { coordinates, name, logo } = company
        if (!coordinates) return null
        const [latitude, longitude] = coordinates

        return (
          <Marker
            position={[latitude, longitude]}
            key={company.id}
            icon={createCustomIcon()}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                {logo && (
                  <Image
                    src={logo}
                    alt={name}
                    width={50}
                    height={50}
                    objectFit="contain"
                  />
                )}
                <h4>{name}</h4>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
