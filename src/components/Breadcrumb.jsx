"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

import arrowDown from "/public/icons/arrowDownIcon.svg"
import arrowUp from "/public/icons/arrowUpIcon.svg"

export default function Breadcrumb({ sections }) {
  const [currentSection, setCurrentSection] = useState("")
  const [isVisible, setIsVisible] = useState(true) // Always visible

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
    <div className="fixed bottom-0 left-0 right-0 z-20 flex flex-col items-center">
      <nav
        className={`flex w-full transform justify-center transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{
          zIndex: 10,
          marginBottom: isVisible ? "" : "-10rem",
          marginTop: isVisible ? "-7rem" : "",
        }}
      >
        <ol className="mb-6 flex list-none flex-row justify-center space-x-8 rounded-full bg-[#34333d] p-4 px-8">
          {sections &&
            sections.map((section) => (
              <li key={section.title} className="flex items-center">
                <button
                  className={"flex items-center space-x-1"}
                  onClick={() => scrollToSection(section.id)}
                >
                  <Image
                    src={section.icon}
                    alt={section.title}
                    width={32}
                    height={32}
                  />
                </button>
              </li>
            ))}
        </ol>
      </nav>
      <div
        className="fixed bottom-64 lg:bottom-32 z-30 mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#34333d]"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <button
          onClick={toggleVisibility}
          className="relative flex h-full w-full items-center justify-center"
        >
          <Image
            src={isVisible ? arrowDown : arrowUp}
            alt={isVisible ? "Arrow Down" : "Arrow Up"}
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  )
}
