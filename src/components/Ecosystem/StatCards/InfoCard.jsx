"use client"

export default function InfoCard({ data }) {
  let label = data.value || ""
  let description = ""

  if (label.includes(" - ")) {
    const splitIndex = label.indexOf(" - ")
    description = label.substring(splitIndex + 2).trim()
    label = label.substring(0, splitIndex).trim()
  }

  const subtitle = data.subtitle || ""
  const unit = data.unit || ""
  const notes = data.notes || ""

  const numericLabel = label.replace(/,/g, "")
  const isNumber = !isNaN(numericLabel) && numericLabel.trim() !== ""

  return (
    <div className="px-2">
      {subtitle && <p className="font-semibold">{subtitle}</p>}

      <div className="flex items-end gap-1">
        <p className={`text-2xl ${isNumber ? "number" : ""}`}>{label}</p>
        {unit && <p className="text-xl">{unit}</p>}
      </div>

      {description && <p className="text-[#b8b8b8]">{description}</p>}

      {notes && (
        <p className="absolute bottom-2 right-2 text-xs text-[#b8b8b8]">
          Info collected from: {notes}
        </p>
      )}
    </div>
  )
}
