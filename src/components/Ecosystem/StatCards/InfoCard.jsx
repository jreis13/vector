"use client"

export default function InfoCard({ data }) {
  return (
    <div>
      <p>{data.value || "N/A"}</p>
    </div>
  )
}
