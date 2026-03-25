"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./ExpertiseBlock.module.css";

interface ExpertiseBlockProps {
  skills: string[];
}

export default function ExpertiseBlock({ skills }: ExpertiseBlockProps) {
  return (
    <motion.div
      className={styles.block}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <motion.p className={styles.label} variants={fadeUp}>
        Expertise
      </motion.p>
      <div className={styles.list}>
        {skills.map((skill, i) => (
          <motion.span key={i} className={styles.skill} variants={fadeUp}>
            {skill}
            {i < skills.length - 1 && (
              <span className={styles.separator}>,&nbsp;</span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
