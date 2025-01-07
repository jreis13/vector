import Companies from "src/components/Ecosystem/EcosystemCompanies"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function CompaniesLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div>
        <div id="Companies" className="py-12">
          <Companies />
        </div>
        <div id="footer" className="pt-12">
          <Footer />
        </div>
      </div>
    </div>
  )
}
