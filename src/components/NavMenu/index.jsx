"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react"

import PATHS from "src/common/data/navigationData"
import MenuClose from "./MenuClose"
import MenuOpen from "./MenuOpen"
import NavLinks from "./NavLinks"

function NavMenu() {
  const { user } = useUser()
  const [isDesktop, setIsDesktop] = useState(false)
  const [toggle, setToggle] = useState(false)

  const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 1024)
  }

  useEffect(() => {
    updateMedia()
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  }, [])

  const authPaths = user
    ? [
        ...PATHS.filter((path) => path.name !== "Login"),
        { name: "Logout", path: "/api/auth/logout" },
      ]
    : [
        ...PATHS.filter(
          (path) => path.name !== "Login" && path.name !== "Companies"
        ),
        { name: "Login", path: "/api/auth/login" },
      ]

  return (
    <div className="flex flex-col items-end">
      {!isDesktop && (
        <>
          <button
            type="button"
            className="mb-2 cursor-pointer border-0 bg-transparent py-0"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <MenuClose /> : <MenuOpen />}
          </button>
          {toggle && <NavLinks paths={authPaths} />}
        </>
      )}
      {isDesktop && <NavLinks paths={authPaths} isDesktop />}
    </div>
  )
}

export default NavMenu
