function CompanyCustomers({ customers }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Customers</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {customers.map((customer, index) => (
          <div key={index} className="rounded-lg border p-4">
            {customer}
          </div>
        ))}
      </div>
    </>
  )
}

export default CompanyCustomers
