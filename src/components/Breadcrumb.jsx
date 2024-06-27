"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function Breadcrumb({ sections }) {
  const [currentSection, setCurrentSection] = useState("");

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

  return (
    <nav className="fixed bottom-0 z-20 w-full lg:w-auto lg:right-0 lg:px-6 mb-6 lg:mb-16 flex flex-col-reverse lg:flex-col items-center lg:items-end">
      <ol className="list-none flex flex-row w-auto justify-center px-8 lg:px-0 lg:flex-col space-x-8 lg:space-x-0 lg:space-y-6 bg-[#34333d] lg:bg-transparent p-4 rounded-full">
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
  );
}

export default Breadcrumb;
