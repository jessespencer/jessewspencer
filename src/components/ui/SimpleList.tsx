"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./SimpleList.module.css";

interface SimpleListProps {
  label: string;
  items: string[];
  link?: {
    href: string;
    label: string;
  };
}

export default function SimpleList({ label, items, link }: SimpleListProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      <p className={styles.label}>{label}</p>
      <p className={styles.text}>
        {items.join(". ")}.
      </p>
      {link && (
        <a
          href={link.href}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      )}
    </motion.div>
  );
}
