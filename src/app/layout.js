import { UserProvider } from "@auth0/nextjs-auth0/client"
import Script from "next/script"
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

        {/* Google Tag Manager */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16826561323"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16826561323');
            `,
          }}
        />

        {/* Iubenda Cookie Consent Scripts */}
        <Script
          id="iubenda-config"
          type="text/javascript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _iub = _iub || [];
              _iub.csConfiguration = {
                "siteId": 3924974,
                "cookiePolicyId": 73927770,
                "lang": "en",
                "storage": { "useSiteId": true }
              };
            `,
          }}
        />
        <Script
          type="text/javascript"
          src="https://cs.iubenda.com/autoblocking/3924974.js"
          strategy="afterInteractive"
        />
        <Script
          type="text/javascript"
          src="//cdn.iubenda.com/cs/gpp/stub.js"
          strategy="afterInteractive"
        />
        <Script
          type="text/javascript"
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          charset="UTF-8"
          async
        />
      </body>
    </html>
  )
}
