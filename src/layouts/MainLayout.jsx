"use client"

import { breadcrumbSections } from "src/common/data/breadcrumbData"
import {
  customersFeatures,
  offeringFeatures,
} from "src/common/data/featureData"

import Image from "next/image"
import ScrollReveal from "src/animations/ScrollReveal"
import CardList from "src/components/CardList"
import MainHero from "src/components/MainHero"
import Breadcrumb from "src/components/structure/Breadcrumb"
import Footer from "src/components/structure/Footer"
import Header from "src/components/structure/Header"

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <Breadcrumb sections={breadcrumbSections} />
      <div className="flex grow flex-col ">
        <MainHero />

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-8 lg:min-h-[calc(100vh-64px)] lg:px-0">
          <div className="pointer-events-none absolute inset-0 -z-10">
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
      </div>
      <Footer />
    </div>
  )
}
