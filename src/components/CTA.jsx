import Image from "next/image"

import Button from "./Button"

import subscribe from "/public/icons/subscribe.svg"

function CTA() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:px-16 lg:py-16">
      <div className="grid grid-cols-1 gap-y-16 sm:gap-y-20 lg:grid-cols-2">
        <div className="flex flex-col gap-6 lg:pt-4">
          <div className="flex flex-col gap-y-6">
            <h2>Join Us</h2>
          </div>
          <Button href="mailto:support@exponentialvector.eu">Subscribe</Button>
        </div>
        <Image
          src={subscribe}
          alt="Subscribe"
          className="w-full md:-ml-4 lg:-ml-0"
        />
      </div>
    </div>
  )
}

export default CTA
