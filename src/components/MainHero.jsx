import Image from "next/image"

export default function MainHero() {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center overflow-hidden px-8 lg:justify-center lg:px-0">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/haikei/layered-waves-haikei.svg"
          alt="Haikei background"
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="mb-6 mt-12 w-full max-w-7xl text-left">
        <Image src="/mainHero.svg" alt="MainHero Image" fill />
        <div className="relative z-10 text-center">
          <h1 className="text-outline mb-4 text-left text-4xl font-bold lg:text-center lg:text-6xl">
            Next-Gen Strategy Tools for Disruptive Business Models
          </h1>
        </div>
      </div>
    </div>
  )
}
