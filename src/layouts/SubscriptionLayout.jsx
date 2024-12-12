import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

function SubscriptionLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-grow flex-col">
        <div id="Subscription" className="flex-grow py-12">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SubscriptionLayout
