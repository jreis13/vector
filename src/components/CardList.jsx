import Image from "next/image"

function CardList({ title, features, imagesOnTop = false }) {
  const getGridCols = () => {
    const count = features?.length || 0
    if (count === 1) return "grid-cols-1"
    if (count === 2) return "grid-cols-2"
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  }

  return (
    <div
      id={title}
      className="flex w-full flex-col items-center px-6 py-8 lg:px-16 lg:py-12"
    >
      <div className="mb-8 text-center">
        <h2>{title}</h2>
      </div>
      <div
        className={`grid ${getGridCols()} w-full gap-x-8 gap-y-10 lg:gap-y-16`}
      >
        {features?.map((feature) => (
          <div
            key={feature.name || feature.description}
            className="flex h-full flex-col items-center text-center"
          >
            {imagesOnTop && feature.image && (
              <div className="relative h-80 w-80 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.name || feature.description}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            {feature.name && <h3 className="py-4">{feature.name}</h3>}
            <p className="py-2">{feature.description}</p>
            <div className="flex-grow" />
            {!imagesOnTop && feature.image && (
              <div className="mt-8 h-80 w-80">
                <Image
                  src={feature.image}
                  alt={feature.name || feature.description}
                  width={300}
                  height={300}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardList
