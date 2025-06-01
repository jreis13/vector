"use client"

import {
  customersFeatures,
  offeringFeatures,
} from "src/common/data/featureData"

import Image from "next/image"
import ScrollReveal from "src/animations/ScrollReveal"
import CTA from "src/components/CTA"
import CardList from "src/components/CardList"
import MainHero from "src/components/MainHero"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

function splitDescription(feature) {
  return {
    ...feature,
    description: feature.description
      ? feature.description.split(".").map((sentence, index) =>
          sentence.trim() ? (
            <span key={index} className="mb-2 block">
              {sentence.trim() + "."}
            </span>
          ) : null
        )
      : feature.description,
  }
}

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col w-full overflow-x-hidden">
      <Header />
      <div className="flex flex-grow flex-col ">
        <MainHero />

        <div className="relative md:min-h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center overflow-hidden px-8 lg:px-0">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <Image
              src="/haikei/layered-waves-haikei.svg"
              alt="Inverted Haikei"
              width={1920}
              height={1080}
              className="object-cover opacity-40"
              style={{ transform: "scaleY(-1)", height: "calc(100vh - 64px)" }}
            />
          </div>
          <ScrollReveal id="offering">
            <CardList
              title="What do we do?"
              features={offeringFeatures}
              sectionImage={
                offeringFeatures.find((f) => f.sectionImage)?.sectionImage
              }
              imageOnRight
              backgroundImage="/haikei/blob-haikei.svg"
            />
          </ScrollReveal>
        </div>
        <ScrollReveal id="customers">
          <CardList
            title="Who are our products for?"
            features={customersFeatures && customersFeatures}
            backgroundImage="/haikei/blob-scatter-haikei.svg"
          />
        </ScrollReveal>
        <ScrollReveal>
          <div id="subscribe" className="py-8">
            <CTA />
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </div>
  )
}
