import Image from "next/image"

export default function DynamicListCard({ data }) {
  const parsedData = Array.isArray(data)
    ? data
        .map((entry) => {
          let match = entry.match(/\[(.*?)\]/)
          let logo = match ? match[1] : null
          let cleanedEntry = entry.replace(/\[.*?\]/, "").trim()
          let [label, description] = cleanedEntry.split(" - ")
          return {
            label: label?.trim(),
            description: description?.trim(),
            logo,
          }
        })
        .filter((entry) => entry.label.length > 0)
    : []

  const hasLogos = parsedData.some((entry) => entry.logo)

  return (
    <div className="flex flex-col h-full items-start gap-4 p-4 bg-[#34333d] rounded-lg">
      <div className="w-full">
        {parsedData.length > 0 ? (
          hasLogos ? (
            <div
              className={`grid gap-6 ${
                parsedData.length % 3 === 0 ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              {parsedData.map((entry, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  {entry.logo && (
                    <Image
                      src={entry.logo}
                      alt={entry.label}
                      className="w-16 h-16 object-contain"
                      width={24}
                      height={24}
                    />
                  )}
                  <p className="text-xl font-semibold text-white mt-2">
                    {entry.label}
                  </p>
                  {entry.description && (
                    <p className="text-[#b8b8b8]">{entry.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {parsedData.map((entry, index) => (
                <li key={index} className="flex flex-col">
                  <p className="text-xl list-item">
                    <span className="text-[#6600cc] font-bold">&#10752;</span>{" "}
                    {entry.label}
                  </p>
                  {entry.description && (
                    <p className="text-[#b8b8b8]">{entry.description}</p>
                  )}
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="text-[#b8b8b8] text-lg text-center">
            No data available.
          </p>
        )}
      </div>
    </div>
  )
}
