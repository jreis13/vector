import Image from "next/image";
import Button from "./Button";

function MainHero({ children }) {
  return (
    <div className="main-hero relative overflow-hidden text-white flex justify-center items-center pt-24">
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <Image
          src="/vector.png"
          fill
          objectPosition="center"
          alt="Background image"
        />
      </div>
      <div className="relative z-10 text-center py-6">
        {children}
        <div className="my-6">
          <Button href="mailto:contact@vector.com">Join Us</Button>
        </div>
      </div>
    </div>
  );
}

export default MainHero;
