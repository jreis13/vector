"use client"

export default function CurrencyCard({ title, data }) {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}:</h3>
      <p className="text-base">{data.value}</p>
    </div>
  )
}
