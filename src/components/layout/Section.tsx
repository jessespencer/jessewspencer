"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  theme?: "dark" | "light";
  variants?: Variants;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  theme = "light",
  variants = fadeUp,
  className,
  id,
}: SectionProps) {
  return (
    <motion.section
      className={`${styles.section} ${className ?? ""}`}
      data-theme={theme}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={variants}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}
