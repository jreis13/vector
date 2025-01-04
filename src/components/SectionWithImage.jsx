import Image from "next/image"

export default function SectionWithImage({
  title,
  sectionImage,
  features,
  imageOnRight = false,
}) {
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
        className={`flex w-full flex-col items-center justify-between gap-y-8 lg:flex-row lg:gap-x-8 ${
          imageOnRight ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative w-full max-w-[300px] lg:max-w-[400px] xl:max-w-[500px]">
          <Image
            src={sectionImage}
            alt={`${title} section image`}
            width="auto"
            height="auto"
            sizes="(max-width: 768px) 100vw, 400px"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col justify-center text-lg lg:text-left lg:text-xl xl:text-2xl">
          {features &&
            features.map((feature, index) => (
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
