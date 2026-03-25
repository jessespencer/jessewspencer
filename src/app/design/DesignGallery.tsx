"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerChildren, viewportConfig } from "@/lib/animations";
import darkBlockStyles from "@/components/ui/DarkBlock.module.css";
import styles from "./page.module.css";

const colors = [
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#533483",
  "#2c3e50",
  "#1b4332",
  "#3d0066",
  "#4a1942",
];

const rows = Array.from({ length: 8 }, (_, i) => ({
  layout: i % 2 === 0 ? ("full" as const) : ("two-col" as const),
  colors: [colors[i % colors.length], colors[(i + 3) % colors.length]],
}));

export default function DesignGallery() {
  return (
    <div className={styles.gallery} data-theme="dark">
      <motion.p
        className={darkBlockStyles.label}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
      >
        Selected works
      </motion.p>
      {rows.map((row, i) =>
        row.layout === "full" ? (
          <motion.div
            key={i}
            className={styles.fullRow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
          >
            <div
              className={styles.placeholder}
              style={{ background: row.colors[0] }}
            />
          </motion.div>
        ) : (
          <div key={i} className={styles.twoColRow}>
            {row.colors.map((color, j) => (
              <motion.div
                key={j}
                className={styles.colItem}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={scaleIn}
              >
                <div
                  className={styles.placeholder}
                  style={{ background: color }}
                />
              </motion.div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
