function CompanyPatents({ patents }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Patents</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {patents.map((patent, index) => (
          <div key={index} className="rounded-lg border p-4">
            {patent}
          </div>
        ))}
      </div>
    </>
  )
}

export default CompanyPatents
