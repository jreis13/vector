import Image from "next/image"
import expVectorAvatar from "public/expVectorAvatar.png"
import HoverScale from "src/animations/HoverScale"

export default function FeatureGrid({
  title,
  features,
  imageOnLeft,
  isCustomersGrid,
}) {
  const getGridCols = () => {
    const count = features?.length || 0
    if (count === 1) return "grid-cols-1"
    if (count === 2 || count === 4) return "grid-cols-2"
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  }

  return (
    <div className="flex flex-col items-center px-6 py-8 lg:px-16 lg:py-12">
      {title && (
        <div className="mb-8 flex items-center justify-center">
          <span className="caret font-bold text-[#7032ff]">^</span>
          <h2 className="text-center text-2xl lg:text-3xl xl:text-4xl leading-tight">
            {title}
          </h2>
          <span className="mt-4 text-[24px] font-bold text-[#7032ff]">v</span>
        </div>
      )}
      <div
        className={`relative w-full ${isCustomersGrid ? "grid-lines-container" : ""} ${!isCustomersGrid ? "py-8" : ""}`}
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
                  style={{ objectFit: "contain", layout: "intrinsic" }}
                />
              </div>
            </div>
          </>
        )}
        <div className={`grid ${getGridCols()} gap-6`}>
          {features &&
            features.map((feature, index) => (
              <div
                key={index}
                className="relative p-4 overflow-hidden flex flex-col items-center"
              >
                <HoverScale className="h-full w-full flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center h-16">
                      {feature.name && (
                        <h3 className="py-4 mb-4 font-bold text-lg md:text-xl lg:text-2xl">
                          {feature.name}
                        </h3>
                      )}
                    </div>
                    {feature.description && (
                      <p className="py-2 text-base md:text-lg lg:text-xl">
                        {feature.description}
                      </p>
                    )}
                  </div>
                  {feature.image && (
                    <div className="flex items-center justify-center">
                      <div className="relative mb-4 h-48 w-48 lg:mb-0 lg:h-80 lg:w-80">
                        <Image
                          src={feature.image}
                          alt={feature.name || feature.description}
                          fill
                          sizes="100vw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  )}
                </HoverScale>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
