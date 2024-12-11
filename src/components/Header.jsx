import Logo from "./Logo"
import NavMenu from "./NavMenu"

function Header() {
  return (
    <header className="z-20 flex h-24 w-full items-center justify-between px-16 py-7 transition-colors">
      <Logo />
      <NavMenu />
    </header>
  )
}

export default Header
