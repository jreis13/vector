import { breadcrumbSections } from "src/common/data/breadcrumbData"
import {
  analysisFeatures,
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
            <h1>Build Your Success.</h1>
            <h3>
              Unlock equity crowdfunding analysis and real private equity data
              delivered directly to your inbox. <br /> Vector provides all the
              information you need to invest confidently. <br />
              Success is not luck; it’s built.
            </h3>
          </div>
        </MainHero>
        <div id="benefits" className="py-12">
          <CardList title="Benefits" features={benefitsFeatures} />
        </div>
        <div id="offering" className="py-12">
          <CardList title="Our Offering" features={offeringFeatures} />
        </div>
        <div id="analysis" className="py-12">
          <CardList
            title="Our Analysis"
            features={analysisFeatures}
            imagesOnTop
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
