function CompanyValueProposition({ valueProposition }) {
  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Value Proposition</h2>
      <div className="pb-8 leading-8">
        {valueProposition
          .split(".")
          .filter((sentence) => sentence.trim() !== "")
          .map((sentence, index) => (
            <p key={index} className="mb-4">
              {sentence.trim()}.
            </p>
          ))}
      </div>
    </div>
  )
}

export default CompanyValueProposition
