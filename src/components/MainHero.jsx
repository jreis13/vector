import { Typography } from "@material-tailwind/react"
import Image from "next/image"
import Button from "./Button"

export default function MainHero({ children }) {
  return (
    <div className="main-hero relative flex flex-col items-center justify-center overflow-hidden px-6 lg:pt-24 min-h-screen">
      <div className="absolute inset-0 z-[-1] h-full w-full">
        <Image src="/mainHero.svg" alt="Background image" fill />
      </div>
      <div className="relative z-10 text-center">
        <Typography
          variant="h1"
          className="lg:text-5xl text-2xl font-bold !leading-snug"
        >
          {children}
        </Typography>
        <div className="my-6">
          <Button href="/api/auth/login">Join Us</Button>
        </div>
      </div>
    </div>
  )
}
