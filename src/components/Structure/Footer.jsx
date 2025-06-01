"use client"

import { IconButton } from "@material-tailwind/react"
import Image from "next/image"
import socialPATHS from "src/common/data/socialsData"
import Logo from "../Logo"

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="w-screen overflow-x-hidden bg-[#34333d] p-8">
      <div className="container mx-auto">
        <div className="grid  grid-cols-1 items-center gap-6 lg:flex">
          <div className="flex justify-center lg:justify-start">
            <Logo />
          </div>

          <div className="flex justify-center">
            <p className="text-center text-sm">
              © {currentYear} Exponential Vector S.R.O - All Rights Reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 items-center justify-center gap-6 lg:flex lg:flex-row lg:justify-end">
            <a
              href="/files/Privacy_Policy_Exponential_Vector.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/files/Terms_and_Conditions_Exponential_Vector.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap hover:underline"
            >
              Terms & Conditions
            </a>
          </div>
          <div className="flex justify-center gap-3">
            {socialPATHS.map(({ name, path, icon }) => (
              <a
                key={name}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton variant="text" size="lg">
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className="opacity-100"
                  />
                </IconButton>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
