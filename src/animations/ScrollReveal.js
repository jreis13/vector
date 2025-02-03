import { motion } from "framer-motion"

const ScrollReveal = ({ children, className, isFirst, isLast, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: isFirst ? 0 : 50 }} // Prevents first item from animating upwards
      whileInView={{ opacity: 1, y: 0 }}
      exit={isLast ? {} : { opacity: 0, y: 50 }} // Prevent hiding the last item
      transition={{ duration: 0.8 }}
      viewport={{
        once: isFirst || isLast ? true : false,
        amount: isLast || isFirst ? 0.1 : 0.4,
      }} // Ensures first & last items stay visible
      className={`p-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
