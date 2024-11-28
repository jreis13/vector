// components/Ecosystem/EcosystemTabs.jsx
"use client"

import React from "react"

const EcosystemTabs = ({ sections, currentTab, setCurrentTab }) => {
  return (
    <div className="mb-4 mt-8 flex items-center justify-center">
      <nav className="flex items-center justify-center">
        <ol className="flex list-none space-x-8 rounded-full bg-[#34333d] p-4 px-8">
          {sections.map((section) => (
            <li key={section.title} className="flex items-center">
              <button
                className={`rounded-full px-4 py-2 text-lg font-medium transition-all duration-300 ${
                  currentTab === section.id
                    ? "bg-white text-[#34333d] shadow-lg"
                    : "bg-[#403f4c] text-white hover:bg-[#565656]"
                }`}
                onClick={() => setCurrentTab(section.id)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default EcosystemTabs
