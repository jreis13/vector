import Footer from "src/components/Footer"
import Header from "src/components/Header"

function SubscriptionLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div>
        <div id="Subscription" className="py-12">
          {children}
        </div>
        <div id="footer" className="pt-12">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default SubscriptionLayout
