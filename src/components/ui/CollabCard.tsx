"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./CollabCard.module.css";

interface CollabCardProps {
  name: string;
  description: string;
  role: string;
}

export default function CollabCard({
  name,
  description,
  role,
}: CollabCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.description}>{description}</p>
      <p className={styles.role}>Role: {role}</p>
    </motion.div>
  );
}
