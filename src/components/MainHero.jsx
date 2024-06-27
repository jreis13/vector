import Image from "next/image";

import Button from "./Button";

function MainHero({ children }) {
  return (
    <div className="main-hero relative overflow-hidden flex flex-col justify-center items-center px-6 lg:pt-24">
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <Image
          src="/mainHero.svg"
          alt="Background image"
          fill
          style={{ objectPosition: "center" }}
        />
      </div>
      <div className="relative z-10 text-center">
        <div
          style={{
            textShadow:
              "1px 1px 1px #4d405e, 0px 0px 1px #4d405e, 1px 0px 1px #4d405e, 0px 1px 1px #4d405e",
          }}
        >
          {children}
        </div>
        <div className="my-6">
          <Button href="mailto:contact@vector.com">Join Us</Button>
        </div>
      </div>
    </div>
  );
}

export default MainHero;
