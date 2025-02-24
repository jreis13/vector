export default function EcosystemActiveInvestorsTable({ data }) {
  const rowAnimation = {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: {
      opacity: 1,
      height: "auto",
      overflow: "hidden",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: { duration: 0 },
    },
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-center text-gray-400">No active investors found</p>
    )
  }

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
      <div className="flex items-center gap-4">
        <h2>Active Investors</h2>
        <span className="text-md text-gray-400">(Past 13 months)</span>
      </div>
      <table className="w-full min-w-max table-auto text-left text-[#e8e8e8] rounded-lg mt-4 mb-2">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Company
            </th>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Investor
            </th>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Funding Round
            </th>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Lead Investor
            </th>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Amount
            </th>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Date
            </th>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((group) => (
            <tr key={group.companyName}>
              <td className="px-6 py-4">{group.company}</td>
              <td className="px-6 py-4">{group.name || "N/A"}</td>
              <td className="px-6 py-4">{group.fundingRound || "N/A"}</td>
              <td className="px-6 py-4">{group.leadInvestor || "N/A"}</td>
              <td className="px-6 py-4">{group.amount || "N/A"}</td>

              <td className="px-6 py-4">{group.date || "N/A"}</td>
              <td className="px-6 py-4">{group.comments || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
