"use client"

export default function NestedListCard({ title, data }) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">{title}:</h3>
      <ul className="list-disc ml-5">
        {Array.isArray(data.value) ? (
          data.value.map((item, idx) => (
            <li key={idx}>
              {typeof item === "string"
                ? item
                : item.subtitle
                  ? `${item.subtitle}: ${item.description}`
                  : JSON.stringify(item)}
            </li>
          ))
        ) : (
          <li>{JSON.stringify(data.value)}</li>
        )}
      </ul>
    </div>
  )
}
