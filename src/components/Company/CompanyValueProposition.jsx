function CompanyValueProposition({ valueProposition }) {
  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Value Proposition</h2>
      <p className="pb-8">{valueProposition}</p>
    </div>
  )
}

export default CompanyValueProposition
