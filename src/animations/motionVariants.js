export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
}

export const heartbeat = {
  animate: { scale: [1, 1.2, 1] },
  transition: { repeat: Infinity, duration: 0.8 },
}

export const hoverEffect = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
}
