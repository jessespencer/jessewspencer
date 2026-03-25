"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp } from "@/lib/animations";
import ImageReveal from "./ImageReveal";
import styles from "./Hero.module.css";

interface HeroProps {
  greeting?: string;
  headline: string;
  subhead?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageAspectRatio?: string;
  theme?: "dark" | "light";
}

export default function Hero({
  greeting,
  headline,
  subhead,
  imageSrc,
  imageAlt,
  imageAspectRatio = "3 / 4",
  theme = "dark",
}: HeroProps) {
  return (
    <motion.section
      className={styles.hero}
      data-theme={theme}
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          {greeting && (
            <motion.p className={styles.greeting} variants={fadeUp}>
              {greeting}
            </motion.p>
          )}
          <motion.h1 className={styles.headline} variants={fadeUp}>
            {headline}
          </motion.h1>
          {subhead && (
            <motion.p className={styles.subhead} variants={fadeUp}>
              {subhead}
            </motion.p>
          )}
        </div>
        {imageSrc !== undefined && (
          <motion.div className={styles.imageWrap} variants={fadeUp}>
            <ImageReveal
              src={imageSrc}
              alt={imageAlt}
              aspectRatio={imageAspectRatio}
            />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
