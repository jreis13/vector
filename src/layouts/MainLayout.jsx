import { breadcrumbSections } from "src/common/data/breadcrumbData"
import {
  questionFeatures,
  customersFeatures,
  benefitsFeatures,
  offeringFeatures,
  goalsFeatures,
} from "src/common/data/featureData"

import Breadcrumb from "src/components/Breadcrumb"
import CTA from "src/components/CTA"
import CardList from "src/components/CardList"
import Footer from "src/components/Footer"
import Header from "src/components/Header"
import MainHero from "src/components/MainHero"

function splitDescription(feature) {
  return {
    ...feature,
    description: feature.description
      ? feature.description.split(".").map((sentence, index) =>
          sentence.trim() ? (
            <p key={index} className="mb-2">
              {sentence.trim() + "."}
            </p>
          ) : null
        )
      : feature.description,
  }
}

function MainLayout() {
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
        <div className="flex flex-col items-center py-8 lg:px-16">
          <div id="benefits" className="py-4">
            <CardList features={questionFeatures.map(splitDescription)} />
          </div>
          <div className="flex w-full flex-col items-center px-6 py-8 text-center lg:px-16 lg:py-12">
            <h2>Same here,</h2>
            <h3>
              Join us in our mission to track Europe’s emerging business
              ecosystems and get ahead of the game with our reporting.
            </h3>
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
              features={offeringFeatures
                .filter((f) => !f.sectionImage)
                .map(splitDescription)}
              sectionImage={
                offeringFeatures.find((f) => f.sectionImage)?.sectionImage
              }
              imageOnRight
            />
          </div>
          <div id="customers" className="py-8">
            <CardList
              title="Who are our products for?"
              features={customersFeatures.map(splitDescription)}
            />
          </div>
          <div id="goals" className="py-8">
            <CardList
              title="What are we aiming for?"
              features={goalsFeatures
                .filter((f) => !f.sectionImage)
                .map(splitDescription)}
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
