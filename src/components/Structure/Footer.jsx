"use client"

import socialPATHS from "src/common/data/socialsData"
import Logo from "../Logo"
import NavLinks from "../NavMenu/NavLinks"

export default function Footer() {
  return (
    <footer className="bg-[#34333d] px-16 py-4 md:py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <div className="flex">
            <Logo />
          </div>
          <span className="text-[#e8e8e8] md:ml-4">
            © 2025 <a href="#">Exponential Vector S.R.O</a>. All Rights
            Reserved.
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <a
            href="/files/Privacy_Policy_Exponential_Vector.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8e8e8] hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="/files/Terms_and_Conditions_Exponential_Vector.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8e8e8] hover:underline"
          >
            Terms & Conditions
          </a>
          <NavLinks isDesktop={true} paths={socialPATHS} />
        </div>
      </div>
    </footer>
  )
}
