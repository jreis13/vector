function CompanyFinancials({ financials }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Financials</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {financials.map((financial, index) => (
          <div key={index} className="rounded-lg border p-4">
            <span className="font-semibold">{financial.label}:</span>{" "}
            {financial.value}
          </div>
        ))}
      </div>
    </>
  )
}

export default CompanyFinancials
