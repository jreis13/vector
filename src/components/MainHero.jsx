import Image from "next/image"

export default function MainHero() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col lg:justify-center items-center overflow-hidden px-8 lg:px-0">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/haikei/layered-waves-haikei.svg"
          alt="Haikei background"
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="max-w-7xl w-full text-left mb-6 mt-12">
        <Image src="/mainHero.svg" alt="MainHero Image" fill />
        <div className="z-10 relative text-center">
          <h1 className="text-4xl lg:text-5xl lg:text-6xl font-bold text-left lg:text-center mb-4 text-outline">
            Next-Gen Strategy Tools for Disruptive Business Models
          </h1>
        </div>
      </div>
    </div>
  )
}
