import CompetitorCard from "./CompetitorCard"

function CompanyKeyCompetitors({ keyCompetitors }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Key Competitors</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 lg:grid-cols-3">
        {keyCompetitors &&
          keyCompetitors.map((competitor, index) => (
            <CompetitorCard key={index} competitor={competitor} />
          ))}
      </div>
    </div>
  )
}

export default CompanyKeyCompetitors
