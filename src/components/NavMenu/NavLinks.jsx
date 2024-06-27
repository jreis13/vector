import classNames from "classnames";
import Login from "./Login";
import NavLink from "./NavLink";

const PATHS = [
  { name: "Companies", path: "/companies/" },
  { name: "Ecosystem", path: "/ecosystem/" },
  { name: "Platforms", path: "/platforms/" },
  { name: "Pricing", path: "/pricing/" },
  { name: "About", path: "/about/" },
  { name: "Login", path: "/login/", type: "image" },
];

function NavLinks({ isDesktop }) {
  return (
    <nav>
      <ul
        className={classNames("flex list-none", {
          "text-right": !isDesktop,
          "flex-col gap-2": !isDesktop,
          "flex-row items-center gap-7 h-8": isDesktop,
        })}
      >
        {PATHS.map(({ name, path, type }) => (
          <li
            key={name}
            className={classNames("icon", { "ml-auto": !isDesktop })}
          >
            {type === "image" ? <Login /> : <NavLink to={path}>{name}</NavLink>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
