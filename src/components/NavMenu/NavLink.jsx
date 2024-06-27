import Link from "src/components/Link"

function NavLink({ active, children, to }) {
  return (
    <p
      className={`transition-opacity duration-200 ${
        active ? "font-medium" : ""
      } hover:text-[#BB44F0] hover:opacity-70`}
    >
      <Link to={to}>{children}</Link>
    </p>
  )
}

export default NavLink
