function CompanyCostStructure({ costStructure }) {
  const { fixed, variable, scalability } = costStructure
  const maxItems = Math.max(fixed.length, variable.length)

  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Cost Structure</h2>
      <div className="flex-grow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Fixed Costs</th>
              <th className="px-4 py-2 text-center">Variable Costs</th>
            </tr>
          </thead>
          <tbody className="flex-1">
            {[...Array(maxItems)].map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center">{fixed[index]}</td>
                <td className="px-4 py-2 text-center">{variable[index]}</td>
              </tr>
            ))}
            <tr>
              <th className="px-4 pt-8 text-center" colSpan="2">
                Scalability
              </th>
            </tr>
            <tr>
              <td className="px-4 py-4 text-center" colSpan="2">
                {scalability}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompanyCostStructure
