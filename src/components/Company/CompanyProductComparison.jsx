import ProductComparisonChart from "./ProductComparisonChart"

function CompanyProductComparison({ comparison }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Product Comparison</h2>
      <div className="h-[60vh]">
        <ProductComparisonChart comparison={comparison.data} />
      </div>
    </div>
  )
}

export default CompanyProductComparison
