"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import ImageReveal from "./ImageReveal";
import styles from "./NextProject.module.css";

interface NextProjectProps {
  slug: string;
  title: string;
  thumbnail?: string;
}

export default function NextProject({
  slug,
  title,
  thumbnail,
}: NextProjectProps) {
  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      <p className={styles.label}>Next Project</p>
      <Link href={`/design/${slug}`} className={styles.link}>
        <div className={styles.thumb}>
          <ImageReveal
            src={thumbnail}
            alt={title}
            aspectRatio="16 / 9"
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </Link>
    </motion.div>
  );
}
