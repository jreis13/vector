"use client";

import Image from "next/image";

function Breadcrumb({ sections }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-0 right-0 mx-6 mb-6 lg:mx-8 lg:mb-8 z-10 flex flex-col-reverse">
      <ol className="list-none flex flex-col space-y-6 ">
        {sections.map((section, index) => (
          <li key={section.title} className="flex items-center ">
            {index !== 0}
            <button
              className=" flex items-center space-x-1"
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
