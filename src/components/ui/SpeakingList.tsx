"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./SpeakingList.module.css";

interface SpeakingItem {
  title: string;
  venue: string;
}

interface SpeakingListProps {
  items: SpeakingItem[];
  cvLink?: string;
}

export default function SpeakingList({ items, cvLink }: SpeakingListProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <motion.p className={styles.label} variants={fadeUp}>
        Speaking Events
      </motion.p>
      {items.map((item, i) => (
        <motion.div key={i} className={styles.item} variants={fadeUp}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.venue}>{item.venue}</p>
        </motion.div>
      ))}
      {cvLink && (
        <motion.a
          href={cvLink}
          className={styles.cvLink}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
        >
          View Full CV &rarr;
        </motion.a>
      )}
    </motion.div>
  );
}
