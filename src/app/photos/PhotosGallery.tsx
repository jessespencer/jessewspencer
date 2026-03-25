"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp, scaleIn, viewportConfig } from "@/lib/animations";
import darkBlockStyles from "@/components/ui/DarkBlock.module.css";
import styles from "./page.module.css";

type Row =
  | { layout: "full"; src: string; alt: string }
  | { layout: "two-col"; items: [{ src: string; alt: string }, { src: string; alt: string }] };

interface GallerySection {
  title: string;
  rows: Row[];
}

const sections: GallerySection[] = [
  {
    title: "Astrophotography",
    rows: [
      { layout: "full", src: "/images/photos/astro/jesse-spencer-photography-antelope-canyon.jpg", alt: "Antelope Canyon" },
      {
        layout: "two-col",
        items: [
          { src: "/images/photos/astro/jesse-spencer-photography-rocky-mountain-national-park-long-exposure.jpg", alt: "Rocky Mountain National Park long exposure" },
          { src: "/images/photos/astro/jesse-spencer-photography-mount-evans.jpg", alt: "Mount Evans" },
        ],
      },
      { layout: "full", src: "/images/photos/astro/jesse-spencer-photography-arches-national-park.jpg", alt: "Arches National Park" },
    ],
  },
  {
    title: "National Parks",
    rows: [
      { layout: "full", src: "/images/photos/national-parks/jesse-spencer-photography-yosemite.jpg", alt: "Yosemite" },
      {
        layout: "two-col",
        items: [
          { src: "/images/photos/national-parks/jesse-spencer-photography-yosemite-smoke.jpg", alt: "Yosemite smoke" },
          { src: "/images/photos/national-parks/jesse-spencer-photography-the-grand-tetons.jpg", alt: "The Grand Tetons" },
        ],
      },
      { layout: "full", src: "/images/photos/national-parks/jesse-spencer-photography-yosemite-taft-point.jpg", alt: "Yosemite Taft Point" },
      {
        layout: "two-col",
        items: [
          { src: "/images/photos/national-parks/jesse-spencer-photography-glacier-national-park-lake.jpg", alt: "Glacier National Park lake" },
          { src: "/images/photos/national-parks/jesse-spencer-photography-zion.jpg", alt: "Zion" },
        ],
      },
      { layout: "full", src: "/images/photos/national-parks/jesse-spencer-photography-glacier-national-park-cracker-lake.jpg", alt: "Glacier National Park Cracker Lake" },
      {
        layout: "two-col",
        items: [
          { src: "/images/photos/national-parks/jesse-spencer-photography-the-grand-tetons-jenny-lake.jpg", alt: "The Grand Tetons Jenny Lake" },
          { src: "/images/photos/national-parks/jesse-spencer-photography-yosemite.jpg", alt: "Yosemite" },
        ],
      },
    ],
  },
  {
    title: "People",
    rows: [
      { layout: "full", src: "/images/photos/people/jesse-spencer-photography-portrait-columbine-flower.jpg", alt: "Portrait with columbine flower" },
    ],
  },
];

export default function PhotosGallery() {
  return (
    <div className={styles.gallery} data-theme="dark">
      {sections.map((section, si) => (
        <motion.div
          key={si}
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerChildren}
        >
          <motion.p className={darkBlockStyles.label} variants={fadeUp}>
            {section.title}
          </motion.p>

          {section.rows.map((row, ri) =>
            row.layout === "full" ? (
              <motion.div
                key={ri}
                className={styles.fullRow}
                variants={fadeUp}
              >
                <img src={row.src} alt={row.alt} className={styles.image} />
              </motion.div>
            ) : (
              <div key={ri} className={styles.twoColRow}>
                {row.items.map((item, j) => (
                  <motion.div
                    key={j}
                    className={styles.colItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={scaleIn}
                  >
                    <img src={item.src} alt={item.alt} className={styles.image} />
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
