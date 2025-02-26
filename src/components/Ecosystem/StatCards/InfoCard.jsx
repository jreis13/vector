"use client"

export default function InfoCard({ data }) {
  let label = data.value || ""
  let description = ""
  if (label.includes(" - ")) {
    const splitIndex = label.indexOf(" - ")
    label = label.substring(0, splitIndex).trim()
    description = label.substring(splitIndex + 2).trim()
  }
  const subtitle = data.subtitle || ""
  const unit = data.unit || ""
  const notes = data.notes || ""

  return (
    <div className="px-2">
      {subtitle && (
        <p className="text-lg font-semibold text-gray-300">{subtitle}</p>
      )}

      <div className="flex gap-1 items-center">
        <p className="text-2xl font-bold">{label}</p>
        {description && <p className="text-[#b8b8b8]">{description}</p>}
        {unit && <p className="text-2xl">{unit}</p>}
      </div>

      {notes && (
        <p className="absolute bottom-2 right-2 text-xs text-gray-400">
          Info collected from: {notes}
        </p>
      )}
    </div>
  )
}
