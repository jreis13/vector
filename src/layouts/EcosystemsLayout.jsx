import Ecosystems from "src/components/Ecosystems"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function EcosystemsLayout() {
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
