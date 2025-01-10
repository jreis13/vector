import Image from "next/image"
import placeholder from "public/icons/avatarIcon.svg"

export default function CompanyCardsClickable({ title, data }) {
  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="mb-8">{title}</h2>
      <div className="grid place-items-center gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="w-[250px]" // Fixed width for uniform spacing
            >
              <div className="flex flex-col">
                <div className="group w-full h-[250px] relative flex flex-col items-center bg-[#34333d] rounded-lg p-4 transition-shadow duration-300 ease-in-out">
                  <div className="mb-4 flex h-24 w-24 items-center justify-center">
                    <Image
                      src={item.photo || item.logo || placeholder}
                      alt={`${item.name} photo`}
                      width={100}
                      height={100}
                      className={
                        title === "Founding Team" ? "" : "object-contain"
                      }
                      objectFit={
                        title === "Founding Team" ? undefined : "contain"
                      }
                    />
                  </div>
                  <div className="text-center">
                    <span className="block font-semibold text-xl">
                      {item.name}
                    </span>
                    <p className="text-[#b8b8b8] text-lg font-medium">
                      {item.title || item.description}
                    </p>
                    {item.value && (
                      <p className="mt-2 text-xl font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  )
}
