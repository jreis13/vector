import { motion } from "framer-motion"

const HoverScale = ({ children, className, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default HoverScale
