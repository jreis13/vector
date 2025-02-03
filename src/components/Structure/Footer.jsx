"use client"

import { IconButton, Typography } from "@material-tailwind/react"
import Image from "next/image"
import socialPATHS from "src/common/data/socialsData"
import Logo from "../Logo"

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-[#34333d] px-8 py-8 w-full overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 items-center">
          <div className="flex justify-center lg:justify-start">
            <Logo />
          </div>

          <div className="flex justify-center">
            <Typography className="text-sm text-center">
              © {currentYear} Exponential Vector S.R.O - All Rights Reserved.
            </Typography>
          </div>

          <div className="flex flex-row items-center justify-center lg:justify-end gap-6">
            <a
              href="/files/Privacy_Policy_Exponential_Vector.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a
              href="/files/Terms_and_Conditions_Exponential_Vector.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline whitespace-nowrap"
            >
              Terms & Conditions
            </a>

            <div className="flex gap-3">
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
      </div>
    </footer>
  )
}
