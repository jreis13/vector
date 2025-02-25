"use client"

export default function InfoCard({ data }) {
  return (
    <div className="flex items-end gap-2 p-4">
      <p className="text-5xl font-bold">{data.value || "N/A"}</p>
      {data.unit && <p className="text-3xl">{data.unit}</p>}
    </div>
  )
}
