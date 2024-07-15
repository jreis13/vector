function CompanyCostStructure({ costStructure }) {
  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Cost Structure</h2>
      <h3 className="pb-2 font-semibold">Fixed Costs</h3>
      <ul className="list-disc pb-4 pl-8">
        {costStructure.fixed.map((cost, index) => (
          <li key={index}>{cost}</li>
        ))}
      </ul>
      <h3 className="pb-2 font-semibold">Variable Costs</h3>
      <ul className="list-disc pb-4 pl-8">
        {costStructure.variable.map((cost, index) => (
          <li key={index}>{cost}</li>
        ))}
      </ul>
      <h3 className="pb-2 font-semibold">Scalability</h3>
      <ul className="list-disc pb-4 pl-8">
        {costStructure.scalability.map((scale, index) => (
          <li key={index}>{scale}</li>
        ))}
      </ul>
    </div>
  )
}

export default CompanyCostStructure
