import CompanyDetails from "src/components/Company/CompanyDetails"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function CompanyLayout({ company, ecosystemName }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div>
        <div id="Companies" className="py-12">
          <CompanyDetails company={company} ecosystemName={ecosystemName} />
        </div>
        <div id="footer" className="pt-12">
          <Footer />
        </div>
      </div>
    </div>
  )
}
