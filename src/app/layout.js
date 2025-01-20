import { UserProvider } from "@auth0/nextjs-auth0/client"
import "src/common/styles/globals.css"

export const metadata = {
  title: "Exponential Vector",
  description:
    "Unlock equity crowdfunding analysis and real private equity data delivered directly to your inbox",
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
