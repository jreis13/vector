function CompanyStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
      {stats &&
        stats.map((stat, index) => (
          <div key={index} className="rounded-lg border p-4">
            <span className="font-semibold">{stat.label}:</span> {stat.value}
          </div>
        ))}
    </div>
  )
}

export default CompanyStats
