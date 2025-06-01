"use client"

import Image from "next/image"

export default function SectionWithImage({
  title,
  sectionImage,
  features,
  imageOnRight = false,
  isLastSection = false,
  backgroundImage,
}) {
  return (
    <section
      className={`relative overflow-hidden ${
        isLastSection ? "py-0" : "py-16 lg:py-28"
      } px-8`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Image
            src={backgroundImage}
            alt="section background"
            fill
            className="w-full h-full opacity-20 mt-16"
          />
        </div>
      )}

      <div className="container mx-auto grid items-center lg:grid-cols-2 gap-12">
        <div
          className={`row-start-2 mt-12 lg:row-auto lg:mt-0 lg:pr-12 ${
            imageOnRight ? "lg:order-2" : ""
          }`}
        >
          {title && (
            <div className="mb-8 flex items-center">
              <span className="text-[#6600cc] caret font-bold text-outline">
                ^
              </span>
              <h2 className="text-center text-3xl lg:text-4xl font-bold text-outline">
                {title}
              </h2>
              <span className="ml-2 text-[#6600cc] font-bold text-outline">
                v
              </span>
            </div>
          )}

          {features && (
            <div className="mt-6 space-y-8">
              {features.map((feature, index) => (
                <div key={index}>
                  {feature.name && (
                    <h3 className="text-2xl font-semibold">{feature.name}</h3>
                  )}
                  {feature.description && (
                    <div className="text-gray-400 text-xl mt-2 text-outline">
                      {feature.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <Image
          src={sectionImage}
          alt={`${title} section image`}
          className="w-full lg:-ml-4 lg:-ml-0 rounded-xl object-cover"
        />
      </div>
    </section>
  )
}
