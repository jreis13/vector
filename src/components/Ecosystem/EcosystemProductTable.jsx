import React from "react"

export default function EcosystemProductTable({ groupedProducts, attributes }) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Company</th>
          {attributes.map((attr) => (
            <th
              key={attr}
              className="border border-gray-300 px-4 py-2 capitalize"
            >
              {attr}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groupedProducts.map((group) => (
          <React.Fragment key={group.companyName}>
            {group.products.map((product, productIndex) => (
              <tr key={`${group.companyName}-${product.name || productIndex}`}>
                {productIndex === 0 && (
                  <td
                    className="border border-gray-300 px-4 py-2 text-center font-bold"
                    rowSpan={group.products.length}
                  >
                    {group.companyName}
                  </td>
                )}
                {attributes.map((attr) => (
                  <td
                    key={`${product.name || productIndex}-${attr}`}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {product[attr] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
