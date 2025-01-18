"use client"

export default function TextCard({ title, data }) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">{title}:</h3>
      <p className="text-base">{data.value}</p>
    </div>
  )
}
