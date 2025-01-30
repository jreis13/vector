"use client"

import Image from "next/image"
import HoverScale from "src/animations/HoverScale"

export default function FeatureGrid({ title, features }) {
  const isEven = features.length % 2 === 0

  return (
    <section className="px-8 lg:py-28">
      <div className="container mx-auto">
        {title && (
          <div className="mb-8 flex items-center justify-center">
            <span className="text-[#7032ff] caret font-bold">^</span>
            <h2 className="text-center text-3xl md:text-4xl font-bold">
              {title}
            </h2>
            <span className="ml-2 text-[#7032ff] font-bold">v</span>
          </div>
        )}

        <div
          className={`grid gap-8 ${
            isEven
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {features?.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl flex flex-col items-center text-center bg-[#34333d]"
            >
              <HoverScale className="h-full w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                  {feature.name && (
                    <h3 className="py-4 mb-2 text-lg md:text-xl lg:text-2xl font-semibold">
                      {feature.name}
                    </h3>
                  )}
                  {feature.description && (
                    <p className="py-2 text-base md:text-lg lg:text-xl text-gray-400">
                      {feature.description}
                    </p>
                  )}
                </div>
                {feature.image && (
                  <div className="flex items-center justify-center">
                    <div className="relative mt-4 h-40 w-40 lg:h-64 lg:w-64">
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
