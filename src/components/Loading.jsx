export default function Loading() {
  return (
    <div className="flex min-w-full items-center justify-center bg-[#403f4c] p-5">
      <div className="flex animate-pulse space-x-2">
        <div className="size-3 rounded-full bg-gray-500"></div>
        <div className="size-3 rounded-full bg-gray-500"></div>
        <div className="size-3 rounded-full bg-gray-500"></div>
      </div>
    </div>
  )
}
