import FeatureGrid from "./FeatureGrid"
import SectionWithImage from "./SectionWithImage"

export default function CardList({
  title,
  features,
  sectionImage,
  imageOnLeft,
  imageOnRight,
  isLastSection,
  backgroundImage,
}) {
  if (sectionImage) {
    return (
      <SectionWithImage
        title={title}
        sectionImage={sectionImage}
        features={features}
        imageOnRight={imageOnRight}
        isLastSection={isLastSection}
        backgroundImage={backgroundImage}
      />
    )
  }
  return (
    <FeatureGrid
      title={title}
      features={features}
      imageOnLeft={imageOnLeft}
      backgroundImage={backgroundImage}
    />
  )
}
