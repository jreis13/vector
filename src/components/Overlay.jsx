import { overlayInfo } from "../common/data/overlayData"

export default function Overlay({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="flex flex-col gap-6 text-center sm:flex-row sm:gap-8">
        {overlayInfo.map((item, index) => (
          <div
            key={index}
            className={`relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-[450px] lg:h-[450px] rounded-lg bg-cover bg-center text-white flex flex-col justify-center items-center ${
              item.title === "Mobility"
                ? "cursor-pointer group"
                : "cursor-default"
            }`}
            style={{ backgroundImage: `url('${item.image}')` }}
            onClick={item.title === "Mobility" ? onDismiss : undefined}
          >
            <div
              className={`w-full h-full flex justify-center items-center flex-col bg-black transition ${
                item.title === "Mobility"
                  ? "bg-opacity-50 group-hover:bg-opacity-0"
                  : "bg-opacity-50"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold ${
                  item.title === "Mobility"
                    ? "text-stroke-2 text-stroke-black"
                    : ""
                }`}
              >
                {item.title}
              </h2>
              {item.title !== "Mobility" && (
                <p className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl">
                  Coming Soon
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
