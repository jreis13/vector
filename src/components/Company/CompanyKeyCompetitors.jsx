import CompetitorCard from "./CompetitorCard"

function CompanyKeyCompetitors({ keyCompetitors }) {
  return (
    <>
      <h2 className="pb-4 text-lg font-bold">Key Competitors</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {keyCompetitors.map((competitor, index) => (
          <CompetitorCard key={index} competitor={competitor} />
        ))}
      </div>
    </>
  )
}

export default CompanyKeyCompetitors
