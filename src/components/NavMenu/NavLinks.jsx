import classNames from "classnames";
import Image from "next/image";
import NavLink from "./NavLink";
import loginIcon from "/public/icons/loginicon.svg";

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
        className={classNames("flex list-none text-right", {
          "flex-col gap-2": !isDesktop,
          "flex-row items-center gap-7 h-8": isDesktop,
        })}
      >
        {PATHS.map(({ name, path, type }) => (
          <li key={name}>
            <NavLink to={path}>
              {type === "image" ? (
                <Image
                  src={loginIcon}
                  alt="Login Icon"
                  width={24}
                  height={24}
                />
              ) : (
                name
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
