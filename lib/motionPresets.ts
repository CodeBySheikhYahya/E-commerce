// Motion presets for consistent animations across the e-commerce site

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// Stagger animations for multiple elements
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Hover animations
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  whileTap: { scale: 0.95 }
};

export const hoverLift = {
  whileHover: { 
    y: -5,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Cart and sidebar animations
export const slideInFromRight = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3, ease: "easeInOut" }
};

export const slideInFromLeft = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Button animations
export const buttonPress = {
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Loading animations
export const pulse = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Scroll-triggered animations
export const scrollReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  viewport: { once: true, margin: "-100px" }
};
