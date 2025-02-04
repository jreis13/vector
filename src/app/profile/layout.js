import { UserProvider } from "@auth0/nextjs-auth0/client"
import "src/common/styles/globals.css"

export const metadata = {
  title: "Exponential Vector",
  description:
    "Next-Gen Strategy Tools for Disruptive Business Models - AAM & eVTOL ecosystems",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
