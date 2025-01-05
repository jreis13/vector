export default function CompanyStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {stats &&
        stats.map(
          (stat, index) =>
            !stat.value.includes("http") && (
              <div
                key={index}
                className="rounded-lg bg-[#403f4c] w-full p-8 flex flex-col justify-between"
              >
                <p className="text-[#e8e8e8] font-semibold text-xl">
                  <span className="block text-[#b8b8b8] text-md font-medium mb-1">
                    {stat.label}
                  </span>
                  {stat.value}
                </p>
              </div>
            )
        )}
    </div>
  )
}
