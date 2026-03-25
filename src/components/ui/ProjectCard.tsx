"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";
import ImageReveal from "./ImageReveal";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function ProjectCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
}: ProjectCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
    >
      <Link href={href} className={styles.link}>
        <ImageReveal
          src={imageSrc}
          alt={imageAlt ?? title}
          aspectRatio="4 / 3"
          className={styles.image}
        />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </Link>
    </motion.div>
  );
}
