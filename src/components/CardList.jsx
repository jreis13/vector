import Image from "next/image";

function CardList({ title, features, imagesOnTop = false }) {
  return (
    <div
      id={title}
      className="flex flex-col justify-center items-center min-h-screen py-8 lg:py-16 px-6 lg:px-16"
    >
      <div>
        <div className="text-center mb-8">
          <h2>{title}</h2>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name || feature.description}
                className="flex flex-col h-full text-center items-center"
              >
                {imagesOnTop && feature.image && (
                  <div className="h-80 w-80 relative overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.name || feature.description}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
                {feature.name && <h3 className="py-4">{feature.name}</h3>}
                <p className="py-2">{feature.description}</p>
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
