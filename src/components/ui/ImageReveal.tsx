"use client";

import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";
import styles from "./ImageReveal.module.css";

interface ImageRevealProps {
  src?: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
}

export default function ImageReveal({
  src,
  alt = "",
  aspectRatio = "16 / 9",
  className,
}: ImageRevealProps) {
  return (
    <motion.div
      className={`${styles.wrapper} ${className ?? ""}`}
      style={{ aspectRatio }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.placeholder} />
      )}
    </motion.div>
  );
}
