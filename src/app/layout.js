import "../common/styles/globals.css";

export const metadata = {
  title: "Vector",
  description: "A description of my Next.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
