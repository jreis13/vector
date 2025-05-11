import { motion } from "framer-motion"

const HoverScale = ({ children, className, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default HoverScale
