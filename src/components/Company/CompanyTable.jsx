export default function CompanyTable({ groupedCompanies, title }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="mb-8">{title}</h2>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 pb-4">
        <table className="w-full min-w-max table-auto text-left text-[#e8e8e8]">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
                Aircraft Model
              </th>
              <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
                Type
              </th>
              <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
                Number of Orders
              </th>
              <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
                Buyer
              </th>
              <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedCompanies.flatMap((group, groupIndex) =>
              group.orders.map((order, orderIndex) => (
                <tr
                  key={`${group.companyName}-${orderIndex}`}
                  className={
                    groupIndex % 2 === 0 ? "bg-transparent" : "bg-[#34333d]"
                  }
                >
                  <td className="px-6 py-4 text-[#e8e8e8] text-lg">
                    {order.model || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-[#e8e8e8] text-lg">
                    {order.type || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-[#e8e8e8] text-lg">
                    {order.numberOfOrders || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-[#e8e8e8] text-lg">
                    {order.buyer || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-[#e8e8e8] text-lg">
                    {order.orderDate || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
