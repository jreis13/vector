import Link from "src/components/Link";

function NavLink({ active, children, to }) {
  return (
    <div
      className={`transition-opacity duration-200 ${
        active ? "font-medium" : ""
      } hover:opacity-70 hover:text-orange-500`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
}

export default NavLink;
