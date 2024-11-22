import Ecosystems from "src/components/Ecosystems"
import Footer from "src/components/Footer"
import Header from "src/components/Header"

function EcosystemsLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div>
        <div id="Ecosystems" className="py-12">
          <Ecosystems />
        </div>
        <div id="footer" className="pt-12">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default EcosystemsLayout
