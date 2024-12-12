import Image from "next/image"
import expVectorAvatar from "public/expVectorAvatar.png"

function FeatureGrid({
  title,
  features,
  imageOnLeft,
  isCustomersGrid,
  centerImage,
}) {
  const getGridCols = () => {
    const count = features?.length || 0
    if (count === 1) return "grid-cols-1"
    if (count === 2 || count === 4) return "grid-cols-2"
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  }

  return (
    <div className="flex w-full flex-col items-center px-6 py-8 lg:px-16 lg:py-12">
      {title && (
        <div className="mb-8 flex items-center justify-center">
          <span className="caret font-bold text-[#7032ff]">^</span>
          <h2 className="text-center text-2xl lg:text-3xl xl:text-4xl">
            {title}
          </h2>
          <span className="mt-4 text-[24px] font-bold text-[#7032ff]">v</span>
        </div>
      )}
      <div
        className={`relative w-full ${isCustomersGrid ? "grid-lines-container" : ""}`}
      >
        {isCustomersGrid && (
          <>
            <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 transform bg-[#fff] sm:block"></div>
            <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 transform bg-[#fff] sm:block"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-0 w-0 sm:h-12 sm:w-12 lg:h-24 lg:w-24">
                <Image
                  src={expVectorAvatar}
                  alt="Exponential Vector Logo"
                  objectFit="contain"
                />
              </div>
            </div>
          </>
        )}
        <div className={`grid ${getGridCols()} gap-4`}>
          {features &&
            features.map((feature, index) => (
              <div key={index} className="p-4">
                <div className="flex flex-col items-center text-center">
                  {feature.name && (
                    <h3 className="py-4 font-bold">{feature.name}</h3>
                  )}
                  {feature.description && (
                    <p className="py-2">{feature.description}</p>
                  )}
                </div>
                {feature.image && (
                  <div className="flex items-center justify-center">
                    <div className="relative mb-4 h-48 w-48 lg:mb-0 lg:h-80 lg:w-80">
                      <Image
                        src={feature.image}
                        alt={feature.name || feature.description}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FeatureGrid
