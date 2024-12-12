import SectionWithImage from "./SectionWithImage"
import FeatureGrid from "./FeatureGrid"

function CardList({
  title,
  features,
  sectionImage,
  imageOnLeft,
  imageOnRight,
  isCustomersGrid = false,
}) {
  if (sectionImage) {
    return (
      <SectionWithImage
        title={title}
        sectionImage={sectionImage}
        features={features}
        imageOnRight={imageOnRight}
      />
    )
  }
  return (
    <FeatureGrid
      title={title}
      features={features}
      imageOnLeft={imageOnLeft}
      isCustomersGrid={isCustomersGrid}
    />
  )
}

export default CardList
