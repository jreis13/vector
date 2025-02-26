"use client"

export default function InfoCard({ data }) {
  return (
    <div className="px-2">
      <div className="flex items-end gap-1">
        <p className="text-2xl font-bold">{data.value || ""}</p>
        {data.unit && <p className="text-2xl">{data.unit}</p>}
      </div>
      {data.notes && (
        <p className="absolute bottom-2 right-2 text-xs text-gray-400">
          Info collected from: {data.notes}
        </p>
      )}
    </div>
  )
}
