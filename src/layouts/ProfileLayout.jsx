import Profile from "src/components/Profile"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function ProfileLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-grow flex-col">
        <div id="Profile" className="flex-grow">
          <Profile />
        </div>
      </div>
      <Footer />
    </div>
  )
}
