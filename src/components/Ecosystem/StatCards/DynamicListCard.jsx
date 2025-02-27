export default function DynamicListCard({ data }) {
  return (
    <div className="flex flex-col h-full items-start gap-4 p-4 bg-[#34333d] rounded-lg">
      <div className="w-full">
        {Array.isArray(data) && data.length > 0 ? (
          <ul className="space-y-3">
            {data
              .map((entry) => entry.trim())
              .filter((entry) => entry.length > 0)
              .map((entry, index) => {
                let [label, description] = entry.split(" - ")

                return (
                  <li key={index} className="flex flex-col">
                    <p className="text-xl list-item">
                      <span className="text-[#6600cc] font-bold">&#10752;</span>{" "}
                      {label}
                    </p>
                    {description && (
                      <p className="text-[#b8b8b8]">{description}</p>
                    )}
                  </li>
                )
              })}
          </ul>
        ) : (
          <p className="text-[#b8b8b8] text-lg text-center">
            No data available.
          </p>
        )}
      </div>
    </div>
  )
}
