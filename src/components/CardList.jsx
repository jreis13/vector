import Image from "next/image";

function CardList({ title, features, imagesOnTop = false }) {
  return (
    <div id={title} className="flex flex-col items-center min-h-screen py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <h2>{title}</h2>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name || feature.description}
                className="flex flex-col h-full text-center items-center"
              >
                {imagesOnTop && feature.image && (
                  <div className="h-80 w-80 relative  overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.name || feature.description}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                {feature.name && (
                  <h3 className="py-4 text-xl leading-7">{feature.name}</h3>
                )}
                <div className="py-2 text-lg leading-7">
                  {feature.description}
                </div>
                <div className="flex-grow" />
                {!imagesOnTop && feature.image && (
                  <div className="mt-8 h-80 w-80">
                    <Image
                      src={feature.image}
                      alt={feature.name || feature.description}
                      width={300}
                      height={300}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardList;
