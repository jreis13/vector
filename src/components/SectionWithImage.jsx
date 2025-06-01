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
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt="section background"
            fill
            className="mt-16 size-full opacity-20"
          />
        </div>
      )}

      <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
        <div
          className={`row-start-2 mt-12 lg:row-auto lg:mt-0 lg:pr-12 ${
            imageOnRight ? "lg:order-2" : ""
          }`}
        >
          {title && (
            <div className="mb-8 flex items-center">
              <span className="caret text-outline font-bold text-[#6600cc]">
                ^
              </span>
              <h2 className="text-outline text-center text-3xl font-bold lg:text-4xl">
                {title}
              </h2>
              <span className="text-outline ml-2 font-bold text-[#6600cc]">
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
                    <div className="text-outline mt-2 text-xl text-gray-400">
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
          className="w-full rounded-xl object-cover lg:-ml-0 lg:-ml-4"
        />
      </div>
    </section>
  )
}
