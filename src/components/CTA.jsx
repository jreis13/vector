import Image from "next/image";
import Button from "./Button";

import subscribe from "/public/icons/subscribe.svg";

function CTA() {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4 flex flex-col gap-6">
            <div className="lg:max-w-lg flex flex-col gap-6">
              <h2>Join Us</h2>
              <p className="leading-8">
                Join our community of savvy investors and unlock the potential
                of crowdfunding! <br /> Equip yourself with the tools and
                insights to make informed investment decisions. <br />
                Subscribe now and stay ahead of the game.
              </p>
            </div>
            <Button href="mailto:contact@vector.com">Subscribe</Button>
          </div>
          <Image
            src={subscribe}
            alt="Subscribe"
            className="w-full md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}

export default CTA;
