"use client";

import { useEffect, useState } from "react";

function Logo() {
  const [isDesktop, setIsDesktop] = useState(false);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <a
      href="/"
      className="text-4xl leading-[44px] transition-opacity duration-200 hover:opacity-70 hover:text-orange-500"
    >
      {isDesktop ? <p>vector^</p> : <p>v/^</p>}
    </a>
  );
}

export default Logo;
