import type { Variants, Transition } from "framer-motion";

// Shared easing and duration scale
export const ease = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
} as const;

const baseTransition: Transition = {
  duration: duration.base,
  ease,
};

// Fade up — default entrance for most sections
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, duration: duration.slow },
  },
};

// Stagger children — parent variant
export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Scale in — for cards, images
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
};

// Slide in — horizontal entrance for split-block content
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...baseTransition, duration: duration.slow },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...baseTransition, duration: duration.slow },
  },
};

// Page transitions
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: duration.fast, ease },
  },
};

// Viewport trigger config (shared)
export const viewportConfig = {
  once: true,
  amount: 0.2 as const,
};
