import Logo from "./Logo";

function Footer() {
  return (
    <footer className="py-4 px-16 md:py-8 lg:py-16 bg-[#34333d]">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <div className="flex">
            <Logo />
          </div>
          <p className="my-6">
            Unlock equity crowdfunding analysis and real private equity data
            delivered directly to your inbox.
          </p>
          <span className="text-sm">
            © 2024 <a href="#">Vector</a>. All Rights Reserved.
          </span>
        </div>
        <ul className="flex flex-col justify-end items-end">
          <li>
            <a href="#" className="mb-2 md:mb-4">
              Companies
            </a>
          </li>
          <li>
            <a href="#" className="mb-2 md:mb-4">
              Ecosystem
            </a>
          </li>
          <li>
            <a href="#" className="mb-2 md:mb-4">
              Platforms
            </a>
          </li>
          <li>
            <a href="#" className="mb-2 md:mb-4">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="mb-2 md:mb-4">
              About
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
