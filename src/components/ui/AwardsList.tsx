"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./AwardsList.module.css";

interface AwardItem {
  title: string;
  subtitle: string;
}

interface AwardsListProps {
  items: AwardItem[];
}

export default function AwardsList({ items }: AwardsListProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <motion.p className={styles.label} variants={fadeUp}>
        Awards
      </motion.p>
      {items.map((item, i) => (
        <motion.div key={i} className={styles.item} variants={fadeUp}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.subtitle}>{item.subtitle}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
