import { motion } from "framer-motion"

const ScrollReveal = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
