"use client"

import { motion } from "framer-motion"

export default function Button({ onClick, href, children, blank = false }) {
  const buttonStyles =
    "inline-flex w-full max-w-xs justify-center rounded-full border uppercase transition-colors duration-300 font-medium px-6 py-3 bg-[#403f4c] md:px-8 md:py-4 text-sm md:text-base"

  const hoverStyles = "hover:bg-[#7032ff] hover:text-[#e8e8e8]"

  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${buttonStyles} ${hoverStyles}`}
        onClick={onClick}
        type="button"
      >
        <p className="text-center">{children}</p>
      </motion.button>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={blank ? "_blank" : "_self"}
        rel={blank ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${buttonStyles} ${hoverStyles}`}
      >
        <p className="text-center">{children}</p>
      </motion.a>
    )
  }

  return null
}
