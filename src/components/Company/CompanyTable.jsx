function CompanyTable({ title, columns = [], rows = [], scalability }) {
  const numColumns = columns.length
  const maxRows = Math.max(...rows.map((row) => row.length), 0)

  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">{title}</h2>
      <div className="flex-grow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {columns &&
                columns.map((col, index) => (
                  <th key={index} className="px-4 py-2 text-center">
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(maxRows)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns &&
                  columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 text-center">
                      {rows[colIndex] && rows[colIndex][rowIndex]
                        ? rows[colIndex][rowIndex]
                        : ""}
                    </td>
                  ))}
              </tr>
            ))}
            {scalability && scalability.length > 0 && (
              <>
                <tr>
                  <th className="px-4 pt-8 text-center" colSpan={numColumns}>
                    Scalability
                  </th>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center" colSpan={numColumns}>
                    {scalability}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompanyTable
