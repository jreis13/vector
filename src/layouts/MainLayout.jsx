"use client"

import { useState } from "react"

import { breadcrumbSections } from "src/common/data/breadcrumbData"
import {
  benefitsFeatures,
  customersFeatures,
  goalsFeatures,
  offeringFeatures,
  questionFeatures,
} from "src/common/data/featureData"

import Breadcrumb from "src/components/Breadcrumb"
import CTA from "src/components/CTA"
import CardList from "src/components/CardList"
import Disclaimer from "src/components/Disclaimer"
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

function MainLayout() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Breadcrumb sections={breadcrumbSections} />
      {showDisclaimer && (
        <Disclaimer onDismiss={() => setShowDisclaimer(false)} />
      )}
      <div className="flex flex-grow flex-col">
        <MainHero>
          <div className="flex flex-col px-6 lg:px-16">
            <h1>A NEW WAY TO UNDERSTAND DISRUPTION</h1>
          </div>
        </MainHero>
        <div className="flex flex-col items-center py-8 lg:px-16">
          <div id="questions" className="py-4">
            <CardList features={questionFeatures.map(splitDescription)} />
          </div>
          <div className="flex w-full flex-col items-center px-6 text-center lg:px-16">
            <h2>Same here,</h2>
            <h2>
              Join us in our mission to track Europe’s emerging business
              ecosystems and get ahead of the game with our reporting.
            </h2>
          </div>
        </div>

        <div className="pt-8">
          <div id="benefits" className="py-8">
            <CardList
              title="Benefits"
              features={benefitsFeatures.map(splitDescription)}
            />
          </div>
          <div id="offering" className="py-8">
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
          </div>
          <div id="customers" className="py-8">
            <CardList
              title="Who are our products for?"
              features={
                customersFeatures && customersFeatures.map(splitDescription)
              }
              isCustomersGrid={true}
            />
          </div>
          <div id="goals" className="py-8">
            <CardList
              title="What are we aiming for?"
              features={
                goalsFeatures &&
                goalsFeatures
                  .filter((f) => !f.sectionImage)
                  .map(splitDescription)
              }
              sectionImage={
                goalsFeatures.find((f) => f.sectionImage)?.sectionImage
              }
            />
          </div>
        </div>
        <div id="subscribe" className="py-8">
          <CTA />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
