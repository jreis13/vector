import Image from "next/image"

function SectionWithImage({
  title,
  sectionImage,
  features,
  imageOnRight = false,
}) {
  return (
    <div className="flex w-full flex-col items-center px-6 py-8 lg:px-16 lg:py-12">
      {title && (
        <h2 className="mb-8 text-center text-2xl lg:text-3xl xl:text-4xl">
          {title}
        </h2>
      )}
      <div
        className={`flex w-full flex-col items-center justify-between gap-y-8 lg:flex-row lg:gap-x-8 ${
          imageOnRight ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative w-full max-w-[300px] lg:max-w-[400px] xl:max-w-[500px]">
          <Image
            src={sectionImage}
            alt={`${title} section image`}
            layout="responsive"
            width={400}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          className={`flex flex-col justify-center ${
            features.length > 1 ? "max-w-[600px]" : "max-w-[800px]"
          } text-center text-lg lg:text-left lg:text-xl xl:text-2xl`}
        >
          {features.map((feature, index) => (
            <div key={index} className="mb-6">
              {feature.name && (
                <h3 className="py-4 text-xl lg:text-2xl xl:text-3xl">
                  {feature.name}
                </h3>
              )}
              {feature.description && (
                <p className="py-2">{feature.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionWithImage
