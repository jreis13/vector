function CompanyMarketSize({ marketSize }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Market Size</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {marketSize.map((market, index) => (
          <div key={index} className="rounded-lg border p-4">
            <span className="font-semibold">{market.label}:</span>{" "}
            {market.value}
          </div>
        ))}
      </div>
    </>
  )
}

export default CompanyMarketSize
