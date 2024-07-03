"use client"

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
      className="text-4xl font-semibold leading-[42px] transition-opacity duration-300 hover:text-[#BB44F0] hover:opacity-70"
    >
      {isDesktop ? (
        <p>
          vector<span className="caret">^</span>
        </p>
      ) : (
        <p>
          v/<span className="caret">^</span>
        </p>
      )}
    </a>
  )
}

export default Logo
