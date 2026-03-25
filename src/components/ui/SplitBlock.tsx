"use client";

import { motion } from "framer-motion";
import {
  slideInLeft,
  slideInRight,
  staggerChildren,
  viewportConfig,
} from "@/lib/animations";
import styles from "./SplitBlock.module.css";

interface SplitBlockProps {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export default function SplitBlock({
  left,
  right,
  reverse = false,
  className,
}: SplitBlockProps) {
  return (
    <motion.div
      className={`${styles.split} ${reverse ? styles.reverse : ""} ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <motion.div className={styles.col} variants={slideInLeft}>
        {left}
      </motion.div>
      <motion.div className={styles.col} variants={slideInRight}>
        {right}
      </motion.div>
    </motion.div>
  );
}
