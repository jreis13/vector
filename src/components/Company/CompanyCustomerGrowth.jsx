function CompanyCustomerGrowth({ customerGrowth }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Customer Growth</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {customerGrowth.map((growth, index) => (
          <div key={index} className="rounded-lg border p-4">
            {growth}
          </div>
        ))}
      </div>
    </>
  )
}

export default CompanyCustomerGrowth
