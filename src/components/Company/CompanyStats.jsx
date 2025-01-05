export default function CompanyStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2 lg:grid-cols-3">
      {stats &&
        stats.map(
          (stat, index) =>
            !stat.value.includes("http") && (
              <div
                key={index}
                className="rounded-lg bg-[#403f4c] border-[#e8e8e8] shadow-lg p-6 transition-transform transform border"
              >
                <p className="font-semibold text-[#e8e8e8] text-lg">
                  <span className="block text-[#b8b8b8] text-sm font-medium mb-1">
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
