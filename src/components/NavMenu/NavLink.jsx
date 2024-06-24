import Link from "src/components/Link";

function NavLink({ active, children, to }) {
  return (
    <p
      className={`transition-opacity duration-200 ${
        active ? "font-medium" : ""
      } hover:opacity-70 hover:text-[#BB44F0]`}
    >
      <Link to={to}>{children}</Link>
    </p>
  );
}

export default NavLink;
