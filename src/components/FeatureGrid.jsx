import Image from "next/image"

function FeatureGrid({ title, features, imageOnLeft }) {
  const getGridCols = () => {
    const count = features?.length || 0
    if (count === 1) return "grid-cols-1"
    if (count === 2 || count === 4) return "grid-cols-2"
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  }

  return (
    <div className="flex w-full flex-col items-center px-6 py-8 lg:px-16 lg:py-12">
      {title && (
        <div className="flex">
          <span className="caret font-bold text-[#7032ff]">^</span>
          <h2 className="mb-8 text-center">{title}</h2>
          <span className="mt-4 text-[24px] font-bold text-[#7032ff]">v</span>
        </div>
      )}
      <div
        className={`grid ${getGridCols()} w-full gap-x-8 gap-y-10 lg:gap-y-16`}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex ${
              imageOnLeft
                ? "flex-col lg:flex-row"
                : "flex-col items-center text-center"
            }`}
          >
            <div className="flex flex-col justify-center py-8">
              {feature.name && <h3 className="py-4">{feature.name}</h3>}
              {feature.description && (
                <p className="py-2">{feature.description}</p>
              )}
            </div>
            {feature.image && (
              <div className="relative mb-4 h-48 w-48 lg:mb-0 lg:h-64 lg:w-64">
                <Image
                  src={feature.image}
                  alt={feature.name || feature.description}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureGrid
