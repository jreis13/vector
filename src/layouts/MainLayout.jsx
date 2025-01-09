"use client"

import { breadcrumbSections } from "src/common/data/breadcrumbData"
import {
  benefitsFeatures,
  customersFeatures,
  goalsFeatures,
  offeringFeatures,
  questionFeatures,
} from "src/common/data/featureData"

import ScrollReveal from "src/animations/ScrollReveal"
import Breadcrumb from "src/components/Breadcrumb"
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <Breadcrumb sections={breadcrumbSections} />
      <div className="flex flex-grow flex-col">
        <MainHero>
          <div className="flex flex-col px-6 lg:px-16">
            <h1>A NEW WAY TO UNDERSTAND DISRUPTION</h1>
          </div>
        </MainHero>
        <ScrollReveal id="questions">
          <CardList features={questionFeatures.map(splitDescription)} />
        </ScrollReveal>
        <ScrollReveal id="benefits">
          <CardList
            title="Benefits"
            features={benefitsFeatures.map(splitDescription)}
          />
        </ScrollReveal>
        <ScrollReveal id="offering">
          <CardList
            title="What do we do?"
            features={
              offeringFeatures &&
              offeringFeatures
                .filter((f) => !f.sectionImage)
                .map(splitDescription)
            }
            sectionImage={
              offeringFeatures.find((f) => f.sectionImage)?.sectionImage
            }
            imageOnRight
          />
        </ScrollReveal>
        <ScrollReveal id="customers">
          <CardList
            title="Who are our products for?"
            features={
              customersFeatures && customersFeatures.map(splitDescription)
            }
            isCustomersGrid={true}
          />
        </ScrollReveal>
        <ScrollReveal id="goals">
          <CardList
            title="What are we aiming for?"
            features={
              goalsFeatures &&
              goalsFeatures.filter((f) => !f.sectionImage).map(splitDescription)
            }
            sectionImage={
              goalsFeatures.find((f) => f.sectionImage)?.sectionImage
            }
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
