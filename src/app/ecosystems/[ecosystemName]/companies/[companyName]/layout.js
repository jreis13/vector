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
        {children}

        {/* Google Tag (Global Site Tag) */}
        <Script
          strategy="afterInteractive"
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
      </body>
    </html>
  )
}
