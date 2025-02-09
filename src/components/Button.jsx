"use client"

import { motion } from "framer-motion"

export default function Button({
  onClick,
  href,
  children,
  blank = false,
  disabled = false,
}) {
  const baseStyles =
    "inline-flex w-full max-w-xs justify-center rounded-full border uppercase transition-colors duration-300 font-medium px-6 py-3 bg-[#403f4c] md:px-8 md:py-4 text-sm md:text-base"

  const enabledHoverStyles = "hover:bg-[#6600cc] hover:text-[#e8e8e8]"
  const disabledStyles = "opacity-50 cursor-not-allowed"

  if (onClick) {
    return (
      <motion.button
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className={`${baseStyles} ${disabled ? disabledStyles : enabledHoverStyles}`}
        onClick={disabled ? undefined : onClick}
        type="button"
        disabled={disabled}
      >
        <p className="text-center">{children}</p>
      </motion.button>
    )
  }

  if (href) {
    return (
      <motion.a
        href={disabled ? undefined : href}
        target={blank ? "_blank" : "_self"}
        rel={blank ? "noopener noreferrer" : undefined}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className={`${baseStyles} ${disabled ? disabledStyles : enabledHoverStyles}`}
        aria-disabled={disabled}
      >
        <p className="text-center">{children}</p>
      </motion.a>
    )
  }

  return null
}
