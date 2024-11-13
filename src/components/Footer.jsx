import socialPATHS from "src/common/data/socialsData"

import Logo from "./Logo"
import NavLinks from "./NavMenu/NavLinks"

function Footer() {
  return (
    <footer className="bg-[#34333d] px-16 py-4 md:py-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex">
              <Logo />
            </div>
            <span>
              © 2024 <a href="#">Vector</a>. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
      <div className="my-2">
        <NavLinks isDesktop={true} paths={socialPATHS} />
      </div>
    </footer>
  )
}

export default Footer
