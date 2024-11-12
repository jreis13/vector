import classNames from "classnames"
import Link from "../Link"

function NavLinks({ paths, isDesktop }) {
  return (
    <nav>
      <ul
        className={classNames("flex list-none", {
          "text-right": !isDesktop,
          "flex-col gap-3": !isDesktop,
          "h-8 flex-row items-center gap-7": isDesktop,
        })}
      >
        {paths.map(({ name, path, type, imageComponent: ImageComponent }) => (
          <li key={name} className="link cursor-pointer">
            {type === "image" ? (
              <ImageComponent />
            ) : (
              <Link to={path}>
                <span className="nav-link">{name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavLinks
