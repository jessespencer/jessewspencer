"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./ExperienceList.module.css";

interface ExperienceItem {
  company: string;
  title: string;
}

interface ExperienceListProps {
  label: string;
  items: ExperienceItem[];
}

export default function ExperienceList({ label, items }: ExperienceListProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <motion.p className={styles.label} variants={fadeUp}>
        {label}
      </motion.p>
      {items.map((item, i) => (
        <motion.div key={i} className={styles.item} variants={fadeUp}>
          <p className={styles.company}>{item.company}</p>
          <p className={styles.title}>{item.title}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
