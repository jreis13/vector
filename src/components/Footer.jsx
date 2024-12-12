"use client"

import socialPATHS from "src/common/data/socialsData"
import Logo from "./Logo"
import NavLinks from "./NavMenu/NavLinks"

function Footer() {
  return (
    <footer className="bg-[#34333d] px-16 py-4 md:py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <div className="flex">
            <Logo />
          </div>
          <span className="text-white md:ml-4">
            © 2024 <a href="#">Exponential Vector S.R.O</a>. All Rights
            Reserved.
          </span>
        </div>

        <div>
          <NavLinks isDesktop={true} paths={socialPATHS} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
