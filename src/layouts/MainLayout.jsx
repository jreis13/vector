import { breadcrumbSections } from "src/common/data/breadcrumbData"
import {
  customersFeatures,
  benefitsFeatures,
  offeringFeatures,
} from "src/common/data/featureData"

import Breadcrumb from "src/components/Breadcrumb"
import CTA from "src/components/CTA"
import CardList from "src/components/CardList"
import Footer from "src/components/Footer"
import Header from "src/components/Header"
import MainHero from "src/components/MainHero"

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <Breadcrumb sections={breadcrumbSections} />
      <div>
        <MainHero>
          <div className="flex flex-col gap-7">
            <h1>A NEW WAY TO UNDERSTAND DISRUPTION</h1>
            <h3>
              Join us in our mission to track Europe’s emerging business
              ecosystems and get ahead of the game with our reporting.
            </h3>
          </div>
        </MainHero>
        <div id="benefits" className="py-12">
          <CardList title="Benefits" features={benefitsFeatures} />
        </div>
        <div id="offering" className="py-12">
          <CardList title="What do we do?" features={offeringFeatures} />
        </div>
        <div id="customers" className="py-12">
          <CardList
            title="Who are our products for?"
            features={customersFeatures}
          />
        </div>
        <div id="subscribe" className="py-12">
          <CTA />
        </div>
        <div id="footer" className="pt-12">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
