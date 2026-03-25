"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren, viewportConfig } from "@/lib/animations";
import styles from "./DarkBlock.module.css";

interface DarkBlockProps {
  label: string;
  headlines: string[];
  body?: string;
  link?: {
    href: string;
    label: string;
  };
}

export default function DarkBlock({
  label,
  headlines,
  body,
  link,
}: DarkBlockProps) {
  return (
    <motion.div
      className={styles.block}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <motion.div className={styles.label} variants={fadeUp}>
        {label}
      </motion.div>
      <div className={styles.content}>
        <div className={styles.headlines}>
          {headlines.map((line, i) => (
            <motion.h3 key={i} className={styles.headline} variants={fadeUp}>
              {line}
            </motion.h3>
          ))}
        </div>
        {body && (
          <motion.p className={styles.body} variants={fadeUp}>
            {body}
          </motion.p>
        )}
        {link && (
          <motion.a
            href={link.href}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
          >
            {link.label}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
