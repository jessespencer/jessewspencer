"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp, viewportConfig } from "@/lib/animations";
import styles from "./TextReveal.module.css";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}

export default function TextReveal({
  text,
  as: Tag = "h2",
  className,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
      className={className}
    >
      <Tag className={styles.text}>
        {words.map((word, i) => (
          <motion.span key={i} className={styles.word} variants={fadeUp}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
