import Logo from "./Logo";
import NavMenu from "./NavMenu";

function Header() {
  return (
    <header className="w-full px-16 z-20 flex items-baseline justify-between py-7 transition-colors h-24 ">
      <Logo />
      <NavMenu />
    </header>
  );
}

export default Header;
