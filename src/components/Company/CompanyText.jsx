export default function CompanyText({ title, data }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="pb-4 text-lg font-bold">{title}</h2>
      <div className="pb-8 leading-8">
        {data &&
          data
            .split(".")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <p key={index} className="mb-4">
                {item.trim()}
              </p>
            ))}
      </div>
    </div>
  )
}
