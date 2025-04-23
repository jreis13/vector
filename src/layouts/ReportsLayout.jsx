import Reports from "src/components/Reports"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function ReportsLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-grow flex-col">
        <div id="Reports" className="flex-grow">
          <Reports />
        </div>
      </div>
      <Footer />
    </div>
  )
}
