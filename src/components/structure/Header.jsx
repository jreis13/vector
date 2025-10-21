"use client"

import { Navbar } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import Logo from "../Logo"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="mb-16">
      <Navbar
        shadow={false}
        color="transparent"
        fullWidth
        className={`fixed left-0 top-0 z-50 flex h-16 w-full items-center border-0 transition-colors duration-300 lg:h-20 ${
          scrolled ? "bg-[#403f4c]" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
          <Logo />
        </div>
      </Navbar>
    </div>
  )
}
