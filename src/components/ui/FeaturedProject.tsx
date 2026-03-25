"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import ImageReveal from "./ImageReveal";
import styles from "./FeaturedProject.module.css";

interface FeaturedProjectProps {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function FeaturedProject({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
}: FeaturedProjectProps) {
  return (
    <motion.div
      className={styles.project}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      <Link href={href} className={styles.link}>
        <ImageReveal
          src={imageSrc}
          alt={imageAlt ?? title}
          aspectRatio="16 / 9"
          className={styles.image}
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
