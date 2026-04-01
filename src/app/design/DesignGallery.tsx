"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerChildren, viewportConfig } from "@/lib/animations";
import darkBlockStyles from "@/components/ui/DarkBlock.module.css";
import styles from "./page.module.css";

const colors = [
  "#1a1a1a",
  "#1c1c1c",
  "#1e1e1e",
  "#181818",
  "#1b1b1b",
  "#1d1d1d",
  "#191919",
  "#171717",
];

interface GalleryRow {
  layout: "full" | "two-col";
  colors: string[];
  images?: string[];
  logos?: string[];
}

interface GallerySection {
  id: string;
  title: string;
  rows: GalleryRow[];
  aspectRatio?: string;
}

const sections: GallerySection[] = [
  {
    id: "selected-works",
    title: "Product Design",
    rows: [
      { layout: "full", colors: [], images: ["/images/jesse-w-spencer-user-interface-hero-shot.jpg"] },
      { layout: "full", colors: [], images: ["/images/cache-wallet-bitcoin-app-wallet-screen.png"] },
      { layout: "two-col", colors: [], images: ["/images/cache-wallet-bitcoin-app-custom-user-interface.png", "/images/every-body-walk-hero-2.png"] },
      { layout: "full", colors: [], images: ["/images/every-body-walk-hero-1.png"] },
      { layout: "full", colors: [], images: ["/images/jesse-w-spencer-workday-phoenix-android-app-hero-shot.png"] },
      { layout: "full", colors: [], images: ["/images/workday-phoenix-android-01.png"] },
      { layout: "full", colors: [], images: ["/images/workday-phoenix-android-02.png"] },
    ],
  },
  {
    id: "branding",
    title: "Branding",
    rows: [
      { layout: "full", colors: [colors[2]], logos: ["/images/design/design/logo-collection/02.svg"] },
      { layout: "two-col", colors: [colors[7], colors[5]], logos: ["/images/design/design/logo-collection/03.svg", "/images/design/design/logo-collection/04.svg"] },
      { layout: "full", colors: [colors[4]], logos: ["/images/design/design/logo-collection/05.png"] },
      { layout: "two-col", colors: [colors[0], colors[3]], logos: ["/images/design/design/logo-collection/06.svg", "/images/design/design/logo-collection/07.svg"] },
      { layout: "full", colors: [colors[6]], logos: ["/images/design/design/logo-collection/08.svg"] },
      { layout: "two-col", colors: [colors[1], colors[4]], logos: ["/images/design/design/logo-collection/09.svg", "/images/design/design/logo-collection/02.svg"] },
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    aspectRatio: "1 / 1",
    rows: [
      { layout: "two-col", colors: [], images: ["/images/album-artwork-3.jpg", "/images/album-artwork-matt-2.jpg"] },
      { layout: "full", colors: [], images: ["/images/album-artwork-breach-and-bellow-1.jpg"] },
      { layout: "two-col", colors: [], images: ["/images/album-artwork-5.jpg", "/images/album-artwork-1.jpg"] },
      { layout: "full", colors: [], images: ["/images/album-artwork-matt-1.jpg"] },
      { layout: "two-col", colors: [], images: ["/images/album-artwork-4.jpg", "/images/album-artwork-6.jpg"] },
      { layout: "two-col", colors: [], images: ["/images/album-artwork-2.jpg", "/images/album-artwork-matt-3.jpg"] },
    ],
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
          {section.rows.map((row, i) => {
            const ratio = section.aspectRatio ? { aspectRatio: section.aspectRatio } : {};
            return row.layout === "full" ? (
              <motion.div
                key={i}
                className={styles.fullRow}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={fadeUp}
              >
                {row.images?.[0] ? (
                  <img
                    src={row.images[0]}
                    alt=""
                    className={styles.placeholder}
                    style={{ objectFit: "cover", ...ratio }}
                  />
                ) : (
                  <div
                    className={styles.placeholder}
                    style={{ background: row.colors[0], ...ratio }}
                  >
                    {row.logos?.[0] && (
                      <img src={row.logos[0]} alt="" className={styles.logo} />
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              <div key={i} className={styles.twoColRow}>
                {(row.images || row.colors).map((item, j) => (
                  <motion.div
                    key={j}
                    className={styles.colItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={scaleIn}
                  >
                    {row.images ? (
                      <img
                        src={item}
                        alt=""
                        className={styles.placeholder}
                        style={{ objectFit: "cover", ...ratio }}
                      />
                    ) : (
                      <div
                        className={styles.placeholder}
                        style={{ background: item, ...ratio }}
                      >
                        {row.logos?.[j] && (
                          <img src={row.logos[j]} alt="" className={styles.logo} />
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}
