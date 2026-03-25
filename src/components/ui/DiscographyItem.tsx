"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import ImageReveal from "./ImageReveal";
import styles from "./DiscographyItem.module.css";

interface DiscographyItemProps {
  title: string;
  type: string;
  year: number;
  coverSrc?: string;
  note?: string;
  credits?: string[];
}

export default function DiscographyItem({
  title,
  type,
  year,
  coverSrc,
  note,
  credits,
}: DiscographyItemProps) {
  return (
    <motion.div
      className={styles.item}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      <div className={styles.cover}>
        <ImageReveal
          src={coverSrc}
          alt={`${title} cover art`}
          aspectRatio="1 / 1"
        />
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.meta}>
          {type} &middot; {year}
        </p>
        {note && <p className={styles.note}>{note}</p>}
        {credits && credits.length > 0 && (
          <div className={styles.credits}>
            {credits.map((credit, i) => (
              <p key={i} className={styles.credit}>
                {credit}
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
