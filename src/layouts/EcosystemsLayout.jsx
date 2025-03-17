"use client"

import {
  companiesFeatures,
  countriesFeatures,
  productFeatures,
  roadmapFeatures,
} from "src/common/data/featureData"

import ScrollReveal from "src/animations/ScrollReveal"
import CardList from "src/components/CardList"
import Ecosystems from "src/components/Ecosystems"
import MainHero from "src/components/MainHero"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function EcosystemLayout() {
  return (
    <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Header />
      <div className="flex flex-grow flex-col gap-8 px-6">
        <MainHero image="/mobility.svg">
          <div className="flex flex-col px-6 lg:px-16">
            <h1 className="uppercase text-outline">Advanced Air Mobility</h1>
          </div>
        </MainHero>
        <ScrollReveal id="companies">
          <CardList
            title="Companies"
            features={companiesFeatures}
            sectionImage={
              companiesFeatures.find((f) => f.sectionImage)?.sectionImage
            }
            imageOnRight
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
          />
        </ScrollReveal>
        <ScrollReveal id="roadmap">
          <CardList
            title="Roadmap"
            features={roadmapFeatures}
            sectionImage={
              roadmapFeatures.find((f) => f.sectionImage)?.sectionImage
            }
            imageOnLeft
            isLastSection
          />
        </ScrollReveal>
        <Ecosystems />
      </div>
      <Footer />
    </div>
  )
}
