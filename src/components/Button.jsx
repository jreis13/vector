"use client"

import { motion } from "framer-motion"

export default function Button({ onClick, href, children }) {
  const buttonStyles =
    "inline-flex w-full max-w-xs justify-center rounded-full border p-4 uppercase transition-colors duration-300 font-medium"

  const hoverStyles = "hover:bg-[#7032ff] hover:text-[#e8e8e8]"

  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonStyles} ${hoverStyles}`}
        onClick={onClick}
        type="button"
      >
        <p>{children}</p>
      </motion.button>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonStyles} ${hoverStyles}`}
      >
        <p>{children}</p>
      </motion.a>
    )
  }

  return null
}
