"use client"

import { breadcrumbSections } from "src/common/data/breadcrumbData"
import {
  customersFeatures,
  evtolFeatures,
  offeringFeatures,
} from "src/common/data/featureData"

import ScrollReveal from "src/animations/ScrollReveal"
import Breadcrumb from "src/components/Breadcrumb"
import Button from "src/components/Button"
import CTA from "src/components/CTA"
import CardList from "src/components/CardList"
import EarlyAccess from "src/components/EarlyAccess"
import MainHero from "src/components/MainHero"
import NewsletterCTA from "src/components/NewsletterCTA"
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
    <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Header />
      <Breadcrumb sections={breadcrumbSections} />
      <div className="flex flex-grow flex-col gap-8 px-6">
        <MainHero image="/mainHero.svg" buttonText="Join Us">
          <div className="flex flex-col px-6 lg:px-16">
            <h1 className="uppercase text-outline">
              Next-Gen Strategy Tools for Disruptive Business Models
            </h1>
          </div>
        </MainHero>
        <ScrollReveal id="benefits">
          <div className="bg-[#34333d] rounded-lg">
            <EarlyAccess />
            <CardList
              title="Innovative Strategy Tool for the AAM and eVTOL Ecosystem"
              features={evtolFeatures.map(splitDescription)}
            />
            <div className="flex justify-center pb-8">
              <Button blank href="/ecosystems">
                Browse Now
              </Button>
            </div>
            <NewsletterCTA />
          </div>
        </ScrollReveal>
        <ScrollReveal id="offering">
          <CardList
            title="What do we do?"
            features={offeringFeatures}
            sectionImage={
              offeringFeatures.find((f) => f.sectionImage)?.sectionImage
            }
            imageOnRight
          />
        </ScrollReveal>
        <ScrollReveal id="customers">
          <CardList
            title="Who are our products for?"
            features={customersFeatures && customersFeatures}
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
