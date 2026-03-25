"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren, viewportConfig } from "@/lib/animations";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      data-theme="dark"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerChildren}
    >
      <div className={`container ${styles.wrap}`}>
        <div className={styles.hero}>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Let&rsquo;s connect.
          </motion.h2>
          <motion.div className={styles.socials} variants={fadeUp}>
            <a href="https://github.com/jessespencer" target="_blank" rel="noopener noreferrer">Github</a>
            <a href="https://linkedin.com/in/jessewspencer" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/jessewspencer" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com/@jessewspencer" target="_blank" rel="noopener noreferrer">Youtube</a>
          </motion.div>
        </div>
        <div className={styles.divider} />
        <motion.div className={styles.bottom} variants={fadeUp}>
          <div className={styles.email}>
            <p className={styles.label}>Say Hello</p>
            <a
              href="mailto:jessespencerw@gmail.com"
              className={styles.emailLink}
            >
              jessespencerw@gmail.com
            </a>
          </div>
          <div className={styles.right}>
            <p className={styles.copyright}>&copy; {new Date().getFullYear()} Jesse Spencer</p>
            <a
              href="#"
              className={styles.backToTop}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back to top
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
