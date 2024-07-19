function CompanyCustomerGrowth({ customerGrowth }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Customer Growth</h2>
      <div className="pb-8">
        {customerGrowth.map((growth, index) => (
          <ul key={index} className="list-disc pl-4">
            <li>{growth}</li>
          </ul>
        ))}
      </div>
    </>
  )
}

export default CompanyCustomerGrowth
