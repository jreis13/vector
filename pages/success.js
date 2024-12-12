import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Button from "src/components/Button"
import Header from "src/components/Header"
import Footer from "src/components/Footer"

export default function SuccessPage() {
  const handleRedirect = () => {
    router.push("/api/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center px-6 py-8 lg:px-16 lg:py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Thank you for subscribing!</h1>
          <p className="mt-4 text-lg text-gray-600">
            Please click the button to go to the Login page.
          </p>
          <Button onClick={handleRedirect}>Go to Login</Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()
