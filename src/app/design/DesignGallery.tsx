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

interface GallerySection {
  id: string;
  title: string;
  rows: Array<{
    layout: "full" | "two-col";
    colors: string[];
  }>;
}

const sections: GallerySection[] = [
  {
    id: "selected-works",
    title: "Product Design",
    rows: Array.from({ length: 8 }, (_, i) => ({
      layout: i % 2 === 0 ? ("full" as const) : ("two-col" as const),
      colors: [colors[i % colors.length], colors[(i + 3) % colors.length]],
    })),
  },
  {
    id: "branding",
    title: "Branding",
    rows: Array.from({ length: 6 }, (_, i) => ({
      layout: i % 2 === 0 ? ("full" as const) : ("two-col" as const),
      colors: [colors[(i + 2) % colors.length], colors[(i + 5) % colors.length]],
    })),
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    rows: Array.from({ length: 6 }, (_, i) => ({
      layout: i % 2 === 0 ? ("full" as const) : ("two-col" as const),
      colors: [colors[(i + 4) % colors.length], colors[(i + 1) % colors.length]],
    })),
  },
];

export default function DesignGallery() {
  return (
    <div className={styles.gallery} data-theme="dark">
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerChildren}
        >
          <motion.p
            id={section.id}
            className={darkBlockStyles.label}
            variants={fadeUp}
          >
            {section.title}
          </motion.p>
          {section.rows.map((row, i) =>
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
        </motion.div>
      ))}
    </div>
  );
}
