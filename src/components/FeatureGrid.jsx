"use client"

import Image from "next/image"
import HoverScale from "src/animations/HoverScale"

export default function FeatureGrid({ title, features, backgroundImage }) {
  const isEven = features.length % 2 === 0

  return (
    <section className="relative overflow-hidden px-8 lg:py-28">
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            fill
            src={backgroundImage}
            alt="section background"
            className="size-full opacity-20"
          />
        </div>
      )}

      <div className="container mx-auto">
        {title && (
          <div className="mb-8 flex items-center justify-center">
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

        <div
          className={`grid gap-8 ${
            isEven
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 lg:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {features?.map((feature, index) => (
            <div
              key={index}
              className="flex h-full flex-col items-center rounded-xl bg-[#34333d] p-6 text-center"
            >
              <HoverScale className="flex size-full flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  {feature.name && (
                    <h3 className="mb-2 flex min-h-[64px] items-center justify-center py-4 text-lg font-semibold lg:text-2xl lg:text-xl">
                      {feature.name}
                    </h3>
                  )}
                  {feature.description && (
                    <div className="py-2 text-base text-gray-400 lg:text-lg lg:text-xl">
                      {feature.description}
                    </div>
                  )}
                </div>
                {feature.image && (
                  <div className="flex items-center justify-center">
                    <div className="relative mt-4 size-40 lg:size-64">
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
    </section>
  )
}
