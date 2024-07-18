import ProductChart from "./ProductChart"

function CompanyProducts({ products }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Products</h2>
      <div className="flex flex-grow items-center justify-center md:max-h-[60vh]">
        <ProductChart products={products} />
      </div>
    </div>
  )
}

export default CompanyProducts
