import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import Section from "@/components/layout/Section";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Creative Archive",
  description: "Creative projects from the past.",
};

export default function ArchivePage() {
  return (
    <>
      <Hero
        headline="Creative Archive"
        imageSrc=""
        imageAlt="Archive"
      />

      <Section theme="light" className={styles.empty}>
        <div className={styles.grid}>
          <p className={styles.placeholder}>Projects coming soon.</p>
        </div>
      </Section>

      <Footer />
    </>
  );
}
