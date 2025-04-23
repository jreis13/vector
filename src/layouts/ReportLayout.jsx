import Report from "src/components/Report"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function ReportLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-grow flex-col">
        <div id="Reports" className="flex-grow">
          <Report />
        </div>
      </div>
      <Footer />
    </div>
  )
}
