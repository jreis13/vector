import Button from "../Button";
import NavLink from "./NavLink";

import classNames from "classnames";

const PATHS = [
  { name: "Companies", path: "/companies/" },
  { name: "Ecosystem", path: "/ecosystem/" },
  { name: "Platforms", path: "/platforms/" },
  { name: "Pricing", path: "/pricing/" },
  { name: "About", path: "/about/" },
];

function NavLinks({ isDesktop }) {
  return (
    <nav>
      <ul
        className={classNames("flex list-none text-right", {
          "flex-col gap-2": !isDesktop,
          "flex-row items-center gap-7 h-8": isDesktop,
        })}
      >
        {PATHS.map(({ name, path }) => (
          <li key={name}>
            <NavLink to={path}>{name}</NavLink>
          </li>
        ))}
        <li>
          <Button href="mailto:contact@vector.com">Login/Register</Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;
