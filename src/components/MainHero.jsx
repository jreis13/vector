import Image from "next/image";

function MainHero({ children }) {
  return (
    <div className="relative h-[790px] md:h-[816px] mb-[120px] overflow-hidden text-white flex justify-center">
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <Image
          src="/heroimage.svg"
          layout="fill"
          //   width={500}
          //   height={500}
          objectFit="cover"
          objectPosition="center"
          alt="Picture of the author"
        />
      </div>
      <div className="relative z-10 text-center px-4 py-6">{children}</div>
    </div>
  );
}

export default MainHero;
