"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import arrowDown from "/public/icons/arrowDown.svg";
import arrowUp from "/public/icons/arrowUp.svg";

function Breadcrumb({ sections }) {
  const [currentSection, setCurrentSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let foundSection = "";
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            foundSection = section.id;
          }
        }
      });
      setCurrentSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id) => {
    if (id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center z-20">
      <nav
        className={`w-full flex justify-center transition-all duration-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{
          zIndex: 10,
          marginBottom: isVisible ? "" : "-10rem",
          marginTop: isVisible ? "-10rem" : "",
        }}
      >
        <ol className="list-none flex flex-row justify-center px-8 space-x-8 bg-[#34333d] p-4 rounded-full mb-6">
          {sections.map((section) => (
            <li key={section.title} className="flex items-center">
              <button
                className={"flex items-center space-x-1"}
                onClick={() => scrollToSection(section.id)}
              >
                <Image
                  src={section.icon}
                  alt={section.title}
                  width={24}
                  height={24}
                />
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div
        className="fixed bottom-6 z-30 w-12 h-12 flex items-center justify-center bg-[#34333d] rounded-full mb-2"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <button
          onClick={toggleVisibility}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={arrowDown}
            alt="Hide Breadcrumb"
            width={24}
            height={24}
            className={`absolute transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src={arrowUp}
            alt="Show Breadcrumb"
            width={24}
            height={24}
            className={`absolute transition-opacity duration-300 ${
              isVisible ? "opacity-0" : "opacity-100"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default Breadcrumb;
