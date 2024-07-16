function CompanyPatents({ patents }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Patents</h2>
      <div className="pb-8">
        {patents.map((growth, index) => (
          <ul key={index} className="list-disc pl-4">
            <li>{growth}</li>
          </ul>
        ))}
      </div>
    </>
  )
}

export default CompanyPatents
