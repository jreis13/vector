"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { IconButton, Navbar } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import PATHS from "src/common/data/navigationData"
import Link from "../Link"
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
      if (isNowDesktop) setOpenNav(false) // ✅ Close menu when switching to desktop
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

  const authPaths = user
    ? [
        ...PATHS.filter((path) => path.name !== "Login / Sign up"),
        { name: "Logout", path: "/api/auth/logout" },
      ]
    : [
        ...PATHS.filter(
          (path) => path.name !== "Login / Sign up" && path.name !== "Profile"
        ),
        { name: "Login / Sign up", path: "/api/auth/login" },
      ]

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

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6">
            {authPaths.map(({ name, path }) => (
              <li key={name}>
                <Link to={path} className="hover:text-gray-400 transition">
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <IconButton
            variant="text"
            onClick={() => setOpenNav(!openNav)}
            className="lg:hidden"
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </IconButton>
        </div>

        {/* Mobile Navigation (Dropdown) */}
        <div
          className={`absolute top-full w-content right-0 bg-[#e8e8e8] text-[#403f4c] mr-4 rounded transition-transform duration-300 ${
            openNav
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-4 p-6">
            {authPaths.map(({ name, path }) => (
              <li key={name}>
                <Link to={path} className="transition block">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Navbar>
    </div>
  )
}
