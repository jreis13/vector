"use client";

import { useEffect, useState } from "react";

import MenuClose from "./MenuClose";
import MenuOpen from "./MenuOpen";
import NavLinks from "./NavLinks";

function NavMenu() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [toggle, setToggle] = useState(false);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div className="flex flex-col items-end">
      {!isDesktop && (
        <>
          <button
            type="button"
            className="py-0 mb-2 bg-transparent border-0 cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <MenuClose /> : <MenuOpen />}
          </button>
          {toggle && <NavLinks />}
        </>
      )}
      {isDesktop && <NavLinks isDesktop />}
    </div>
  );
}

export default NavMenu;
