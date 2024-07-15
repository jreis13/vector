function CompanyRevenueStreams({ revenueStreams }) {
  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Revenue Streams</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {revenueStreams.map((stream, index) => (
          <div key={index} className="rounded-lg border p-4">
            <span className="font-semibold">{stream.label}:</span>{" "}
            {stream.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyRevenueStreams
