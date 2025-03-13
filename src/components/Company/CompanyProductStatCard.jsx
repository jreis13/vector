import Image from "next/image"

export default function CompanyProductStatCard({ product }) {
  const isVideo = product.image?.endsWith(".mp4")

  return product.image ? (
    <div className="flex bg-[#34333d] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl w-full min-h-[400px]">
      <div className="relative flex-shrink-0 w-1/2 h-full">
        {isVideo ? (
          <video
            src={product.image}
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            priority
          />
        )}
      </div>
      <div className="flex flex-col justify-between p-6 text-white w-1/2">
        <div>
          <h3
            className="text-4xl font-bold mb-4"
            style={{
              textShadow:
                "1px 1px 1px #34333d, 0px 0px 1px #34333d, 1px 0px 1px #34333d, 0px 1px 1px #34333d",
            }}
          >
            {product.name}
          </h3>
          <p
            className="mb-6 text-2xl"
            style={{
              textShadow:
                "1px 1px 1px #34333d, 0px 0px 1px #34333d, 1px 0px 1px #34333d, 0px 1px 1px #34333d",
            }}
          >
            {product.description}
          </p>
        </div>
        <div className="w-full border-t border-white pt-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(product).map(
              ([key, value]) =>
                key !== "name" &&
                key !== "description" &&
                key !== "image" && (
                  <div
                    key={key}
                    className="flex flex-col"
                    style={{
                      textShadow:
                        "1px 1px 1px #34333d, 0px 0px 1px #34333d, 1px 0px 1px #34333d, 0px 1px 1px #34333d",
                    }}
                  >
                    <p className="font-bold capitalize text-3xl">
                      {key.replace(/_/g, " ")}:
                    </p>
                    <p className={`text-2xl ${!isNaN(value) ? "number" : ""}`}>
                      {value}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null
}
