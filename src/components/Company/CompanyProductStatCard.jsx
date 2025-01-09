import Image from "next/image"

export default function CompanyProductStatCard({ product }) {
  return product.image ? (
    <div className="relative flex flex-col bg-white rounded-lg border overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl w-[700px] min-h-[400px]">
      <div className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-between p-6 text-white">
        <div>
          <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
          <p className="mb-6">{product.description}</p>
        </div>
        <div className="w-full border-t border-white pt-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(product).map(
              ([key, value]) =>
                key !== "name" &&
                key !== "description" &&
                key !== "image" && (
                  <div key={key} className="flex flex-col">
                    <span className="font-medium capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span>{value}</span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null
}
