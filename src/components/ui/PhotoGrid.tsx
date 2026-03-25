"use client";

import { motion } from "framer-motion";
import { staggerChildren, scaleIn, viewportConfig } from "@/lib/animations";
import ImageReveal from "./ImageReveal";
import styles from "./PhotoGrid.module.css";

interface PhotoItem {
  src?: string;
  alt?: string;
  aspectRatio?: string;
}

interface PhotoGridProps {
  label: string;
  photos: PhotoItem[];
}

export default function PhotoGrid({ label, photos }: PhotoGridProps) {
  return (
    <motion.div
      className={styles.section}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <motion.h3 className={styles.label} variants={scaleIn}>
        {label}
      </motion.h3>
      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <motion.div key={i} variants={scaleIn}>
            <ImageReveal
              src={photo.src}
              alt={photo.alt ?? `${label} photo ${i + 1}`}
              aspectRatio={photo.aspectRatio ?? "4 / 3"}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
