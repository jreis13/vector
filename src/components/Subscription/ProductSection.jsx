import ProductCard from "./ProductCard"

export function ProductSection({ onSelectProduct }) {
  const products = [
    {
      title:
        "AAM - Global eVTOL Market Review (Passenger Commercial Tracker) - Q1 2025",
      desc: "Purchase the full report.",
      price: "€499,99",
      features: [
        "Deep dive on eVTOL commercial transactions",
        "94 commercial transactions analysed",
        "27 Manufacturer Profiles",
        "31 Aircraft Analysis",
        "3 Key Regions (North America, Europe and Asia)",
        "+99 pages featuring insights and data analysis",
        "PDF version available on request",
      ],
      offer: "* Introductory offer",
      type: "paid",
    },

    {
      title: "Annual Subscription",
      desc: "Unlimited access to the AAM ecosystem for 12 months.",
      price: "€291,67",
      features: [
        "Access to our regularly updated knowledge database",
        "Access to all reports",
        "Insights on over 40 different manufacturers",
        "Profiles of over 55 active investors",
        "Deep dives on 6 detailed country profiles",
        "Analysis of over 50 different aircraft",
        "Agentic AI simulations for adoption rates (Coming Soon)",
      ],
      warning: "* Yearly commitments only",
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
        <p className="mb-2 font-normal text-gray-500">
          We offer volume discounts for the reports. We also accept payments via
          Crypto or Bank Transfer. <br /> For these cases, contact us at{" "}
          <a
            href="mailto:enquiries@exponentialvector.eu"
            className="hover:underline"
          >
            enquiries@exponentialvector.eu
          </a>
        </p>
      </div>
      <div className="mt-8">
        <div className="container mx-auto grid gap-10 md:grid-cols-2">
          {products.map((props, key) => (
            <ProductCard key={key} {...props} onClick={onSelectProduct} />
          ))}
        </div>
      </div>
    </section>
  )
}
