"use client";

import { motion } from "framer-motion";
import { scaleIn, staggerChildren, viewportConfig } from "@/lib/animations";
import styles from "./ExperienceCard.module.css";

interface ExperienceCardItem {
  company: string;
  logo?: React.ReactNode;
  title: string;
  years: string;
  description: string;
}

interface ExperienceCardsProps {
  items: ExperienceCardItem[];
}

export default function ExperienceCards({ items }: ExperienceCardsProps) {
  return (
    <motion.div
      className={styles.grid}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      {items.map((item, i) => (
        <motion.div key={i} className={styles.card} variants={scaleIn}>
          {item.logo ? (
            <div className={styles.logo}>{item.logo}</div>
          ) : (
            <h3 className={styles.company}>{item.company}</h3>
          )}
          <div className={styles.meta}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.years}>{item.years}</span>
          </div>
          <p className={styles.description}>{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
