import Image from "next/image"
import closeIcon from "public/icons/closeIcon.svg"

export default function Disclaimer({ onDismiss }) {
  return (
    (<div className="absolute mt-32 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#34333d] text-white p-4 shadow-md rounded-lg max-w-md">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">
          Disclaimer: This website is currently under development. <br /> Some
          features might not be available for public use.
        </p>
        <button onClick={onDismiss}>
          <Image
            src={closeIcon}
            alt="Close"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </button>
      </div>
    </div>)
  );
}
