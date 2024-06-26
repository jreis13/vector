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
    <nav className="fixed bottom-0 right-0 px-8 mb-16 lg:mb-16 z-10 flex flex-col-reverse">
      <ol className="list-none flex flex-col space-y-6">
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
