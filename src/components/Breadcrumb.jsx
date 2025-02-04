"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import arrowDown from "/public/icons/arrowDownIcon.svg"
import arrowUp from "/public/icons/arrowUpIcon.svg"

export default function Breadcrumb({ sections }) {
  const [currentSection, setCurrentSection] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      let foundSection = ""
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            foundSection = section.id
          }
        }
      })
      setCurrentSection(foundSection)

      const scrollPosition = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      setIsAtBottom(scrollPosition >= pageHeight - 10)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections])

  const scrollToSection = (id) => {
    if (id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div
      className={`fixed bottom-20 left-0 right-0 z-20 flex flex-col items-center transition-opacity duration-300 ${
        isAtBottom ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <nav
        className={`flex w-full transform justify-center transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ol className="mt-6 flex list-none flex-row justify-center space-x-8 rounded-full bg-[#34333d] p-4 px-6 md:px-8">
          {sections &&
            sections.map((section) => (
              <li key={section.title} className="flex items-center">
                <button
                  className="flex items-center"
                  onClick={() => scrollToSection(section.id)}
                >
                  <Image
                    src={section.icon}
                    alt={section.title}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </button>
              </li>
            ))}
        </ol>
      </nav>

      <div
        className="fixed bottom-2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#34333d]"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          onClick={toggleVisibility}
          className="relative flex h-full w-full items-center justify-center"
        >
          <Image
            src={isVisible ? arrowDown : arrowUp}
            alt={isVisible ? "Arrow Down" : "Arrow Up"}
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  )
}
