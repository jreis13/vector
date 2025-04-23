import ProductCard from "./ProductCard"

export function ProductSection({ onSelectProduct }) {
  const products = [
    {
      title: "Free PDF Report",
      desc: "Get the public version with high-level insights.",
      price: "€0",
      features: ["PDF format", "Public release data", "Basic overview"],
      type: "free",
      viewLink: "/reports/publicReport",
    },
    {
      title: "Paid PDF Report",
      desc: "Latest report updated until today.",
      price: "€79",
      features: ["Fresh insights", "Forecasts", "Raw data"],
      type: "paid",
    },
    {
      title: "Annual Subscription",
      desc: "Unlimited access to an ecosystem for 12 months.",
      price: "€291,67",
      features: ["* Paid yearly", "Regular updates", "Team licenses"],
      type: "subscription",
      marked: true,
    },
  ]

  return (
    <section className="py-16 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4"> Join Exponential Vector</h2>
        <p className="mb-8 font-normal text-gray-500">
          Select the best path for accessing our data and ecosystem reports.
        </p>
      </div>
      <div className="mt-24">
        <div className="container mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((props, key) => (
            <ProductCard key={key} {...props} onClick={onSelectProduct} />
          ))}
        </div>
      </div>
    </section>
  )
}
