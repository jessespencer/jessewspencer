"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerChildren, fadeUp } from "@/lib/animations";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  headline: string;
  imageSrc: string;
  imageAlt: string;
}

const ArrowSvg = () => (
  <svg
    width="32"
    height="32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m5.269 12.664-1.415 1.414L12 22l8.117-7.922-1.414-1.414-5.702 5.702V2H11v16.395l-5.73-5.731Z"
      fill="currentColor"
    />
  </svg>
);

export default function PageHero({ headline, imageSrc, imageAlt }: PageHeroProps) {
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"enter" | "leave">("enter");

  return (
    <motion.section
      className={styles.hero}
      data-theme="dark"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      <motion.div className={styles.imageWrap} variants={fadeUp}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </motion.div>
      <div className="container">
        <motion.h1 className={styles.headline} variants={fadeUp}>
          {headline}
        </motion.h1>
        <motion.div className={styles.arrowWrap} variants={fadeUp}>
          <span
            className={styles.arrow}
            onMouseEnter={() => {
              setDirection("enter");
              setAnimKey((k) => k + 1);
            }}
            onMouseLeave={() => {
              setDirection("leave");
              setAnimKey((k) => k + 1);
            }}
          >
            <div
              key={animKey}
              className={
                direction === "enter" ? styles.trackDown : styles.trackUp
              }
            >
              <ArrowSvg />
              <ArrowSvg />
            </div>
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
