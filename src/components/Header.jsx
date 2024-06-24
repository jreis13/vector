import Logo from "./Logo";
import NavMenu from "./NavMenu";

function Header({ isScrolled }) {
  return (
    <header
      className={`w-full z-20 flex items-baseline justify-between px-6 py-7 transition-colors h-24 ${
        isScrolled ? "pb-10 text-gray-400" : ""
      }`}
    >
      <Logo />
      <NavMenu />
    </header>
  );
}

export default Header;
