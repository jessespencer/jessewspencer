"use client";

import { useState, useEffect } from "react";
import styles from "./StickyNav.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface StickyNavProps {
  links: NavLink[];
}

export default function StickyNav({ links }: StickyNavProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${visible ? styles.visible : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.pill}>
        {links.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
