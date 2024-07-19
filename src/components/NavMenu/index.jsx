"use client"

import { useEffect, useState } from "react"

import PATHS from "src/common/data/navigationData"
import MenuClose from "./MenuClose"
import MenuOpen from "./MenuOpen"
import NavLinks from "./NavLinks"

function NavMenu() {
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
          {toggle && <NavLinks paths={PATHS} />}
        </>
      )}
      {isDesktop && <NavLinks paths={PATHS} isDesktop />}
    </div>
  )
}

export default NavMenu
