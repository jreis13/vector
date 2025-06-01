"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { Navbar } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import Logo from "../Logo"

export default function Header() {
  const { user } = useUser()
  const [openNav, setOpenNav] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateMedia = () => {
      const isNowDesktop = window.innerWidth >= 960
      setIsDesktop(isNowDesktop)
      if (isNowDesktop) setOpenNav(false)
    }

    updateMedia()
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  }, [])

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
        className={`fixed top-0 left-0 w-full z-50 border-0 h-16 lg:h-20 flex items-center transition-colors duration-300 ${
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
