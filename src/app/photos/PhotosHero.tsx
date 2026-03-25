"use client";

import { motion } from "framer-motion";
import { staggerChildren, fadeUp } from "@/lib/animations";
import styles from "./photosHero.module.css";

export default function PhotosHero() {
  return (
    <motion.section
      className={styles.hero}
      data-theme="dark"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <motion.div className={styles.imageWrap} variants={fadeUp}>
        <img
          src="/images/photos/national-parks/jesse-spencer-photography-yosemite.jpg"
          alt="Yosemite"
          className={styles.image}
        />
      </motion.div>
      <div className="container">
        <motion.h1 className={styles.headline} variants={fadeUp}>
          My favorite shots from years of adventures.
        </motion.h1>
      </div>
    </motion.section>
  );
}
