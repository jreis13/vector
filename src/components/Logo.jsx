"use client"

import Image from "next/image"
import expVectorLogo from "public/expVectorLogo.png"

import { useEffect, useState } from "react"

function Logo() {
  const [isDesktop, setIsDesktop] = useState(false)

  const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 1024)
  }

  useEffect(() => {
    updateMedia()
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  }, [])

  return (
    <a
      href="/"
      className="transition-text-opacity text-4xl font-semibold leading-[42px] duration-300 hover:text-[#7032ff] hover:text-opacity-70"
    >
      {isDesktop ? (
        <div className="flex">
          <Image
            alt="Exponential Vector Logo"
            src={expVectorLogo}
            width={80}
            height={80}
          />
          <p>exponentialvector</p>
        </div>
      ) : (
        <Image
          alt="Exponential Vector Logo"
          src={expVectorLogo}
          width={80}
          height={80}
        />
      )}
    </a>
  )
}

export default Logo
