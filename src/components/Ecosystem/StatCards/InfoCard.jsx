"use client"

export default function InfoCard({ data }) {
  return (
    <div>
      {/* Render only the data */}
      <p>{data.value || "N/A"}</p>
    </div>
  )
}
