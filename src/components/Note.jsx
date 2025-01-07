import Image from "next/image"
import closeIcon from "public/icons/closeIcon.svg"

export default function Note({ onDismiss, children }) {
  return (
    <div className="bg-[#34333d] text-white p-4 shadow-md rounded-lg max-w-md">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">{children}</p>
        <button onClick={onDismiss}>
          <Image src={closeIcon} alt="Close" width={24} height={24} />
        </button>
      </div>
    </div>
  )
}
