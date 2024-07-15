function CompanyFoundingTeam({ foundingTeam }) {
  return (
    <div className="flex min-h-screen flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">Founding Team</h2>
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {foundingTeam.map((member, index) => (
          <div key={index} className="rounded-lg border p-4">
            <span className="font-semibold">{member.label}:</span>{" "}
            {member.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyFoundingTeam
