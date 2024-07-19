import navigationPATHS from "src/common/data/navigationData"
import socialPATHS from "src/common/data/socialsData"

import Link from "./Link"
import Logo from "./Logo"
import NavLinks from "./NavMenu/NavLinks"
import Email from "./icons/Email"

function Footer() {
  return (
    <footer className="bg-[#34333d] px-16 py-4 md:py-8 lg:py-16">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex">
            <Logo />
          </div>
          <p className="my-6">
            Unlock equity crowdfunding analysis and real private equity data
            delivered directly to your inbox.
          </p>
          <div className="my-6">
            <a href="/privacy">Privacy Policy</a>
            <span className="px-2">|</span>
            <a href="/terms">Terms of Service</a>
          </div>
          <span>
            © 2024 <a href="#">Vector</a>. All Rights Reserved.
          </span>
        </div>
        <NavLinks isDesktop={false} paths={navigationPATHS} />
      </div>
      <div className="my-6">
        <NavLinks isDesktop={true} paths={socialPATHS} />
      </div>
      <div className="mt-6">
        <Link to={"mailto:contact@vector.com"}>
          <Email />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
