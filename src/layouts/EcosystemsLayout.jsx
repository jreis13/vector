"use client"

import {
  companiesFeatures,
  countriesFeatures,
  productFeatures,
} from "src/common/data/featureData"

import ScrollReveal from "src/animations/ScrollReveal"
import CardList from "src/components/CardList"
import Ecosystems from "src/components/Ecosystems"
import MainHero from "src/components/MainHero"
import Roadmap from "src/components/Roadmap"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function EcosystemLayout() {
  return (
    <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Header />
      <div className="flex flex-grow flex-col gap-8">
        <MainHero />
        <ScrollReveal id="companies">
          <CardList
            title="Companies"
            features={companiesFeatures}
            sectionImage={
              companiesFeatures.find((f) => f.sectionImage)?.sectionImage
            }
            imageOnRight
            backgroundImage="/haikei/blob-haikei.svg"
          />
        </ScrollReveal>
        <ScrollReveal id="countries">
          <CardList
            title="Country Profiles"
            features={countriesFeatures}
            sectionImage={
              countriesFeatures.find((f) => f.sectionImage)?.sectionImage
            }
            imageOnLeft
            backgroundImage="/haikei/blob-haikei-2.svg"
          />
        </ScrollReveal>
        <ScrollReveal id="product">
          <CardList
            title="Products"
            features={productFeatures}
            sectionImage={
              productFeatures.find((f) => f.sectionImage)?.sectionImage
            }
            imageOnRight
            backgroundImage="/haikei/blob-haikei-3.svg"
          />
        </ScrollReveal>
        <ScrollReveal id="roadmap">
          <Roadmap />
        </ScrollReveal>
        <Ecosystems />
      </div>
      <Footer />
    </div>
  )
}
