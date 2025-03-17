import FeatureGrid from "./FeatureGrid"
import SectionWithImage from "./SectionWithImage"

export default function CardList({
  title,
  features,
  sectionImage,
  imageOnLeft,
  imageOnRight,
  isLastSection,
}) {
  if (sectionImage) {
    return (
      <SectionWithImage
        title={title}
        sectionImage={sectionImage}
        features={features}
        imageOnRight={imageOnRight}
        isLastSection={isLastSection}
      />
    )
  }
  return (
    <FeatureGrid title={title} features={features} imageOnLeft={imageOnLeft} />
  )
}
