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
    <div className="relative flex min-h-screen flex-col w-full overflow-x-hidden">
      {/* Mesh pattern background as a persistent layer */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: "#403f4c",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23e8e8e8' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
      </div>
      <Header />
      <Breadcrumb sections={breadcrumbSections} />
      <div className="flex flex-grow flex-col gap-8">
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
            backgroundImage="/haikei/blob-haikei.svg"
          />
        </ScrollReveal>
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
