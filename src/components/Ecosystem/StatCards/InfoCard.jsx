"use client"

export default function InfoCard({ data }) {
  return (
    <div>
      <p className="ml-2">{data.value || "N/A"}</p>
    </div>
  )
}
