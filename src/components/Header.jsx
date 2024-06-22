import Logo from "./Logo";
import NavMenu from "./NavMenu";

function Header({ isScrolled }) {
  return (
    <header
      className={`fixed top-0 left-0 z-20 flex items-baseline justify-between w-screen px-6 py-7 transition-colors ${
        isScrolled ? "pb-10 text-gray-400" : ""
      }`}
    >
      <Logo />
      <NavMenu />
    </header>
  );
}

export default Header;
