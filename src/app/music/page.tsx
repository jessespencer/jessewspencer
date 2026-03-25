import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import Section from "@/components/layout/Section";
import DiscographyItem from "@/components/ui/DiscographyItem";
import CollabCard from "@/components/ui/CollabCard";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Music",
  description:
    "For as long as I can remember, I've been playing music. Breach & Bellow, collaborations, and more.",
};

export default function MusicPage() {
  return (
    <>
      <Hero
        headline="Music"
        subhead="For as long as I can remember, I've been playing music."
        imageSrc=""
        imageAlt="Music portrait"
      />

      <Section theme="light" className={styles.about}>
        <div className={styles.aboutText}>
          <p>
            Music has been a constant thread through my life. I&rsquo;ve toured
            with Matt Hires, played in bands across the country, and
            spent years writing and recording my own songs. My current
            project is Breach &amp; Bellow — a personal songwriting journey
            that blends indie rock, folk, and ambient textures.
          </p>
        </div>
      </Section>

      <Section theme="light">
        <h2 className={styles.sectionHeading}>Breach &amp; Bellow</h2>
        <p className={styles.sectionSubhead}>
          My personal songwriting journey.
        </p>
        <div className={styles.discography}>
          <DiscographyItem
            title="All I Have"
            type="EP"
            year={2018}
            note="Includes a music video"
          />
          <DiscographyItem
            title="Burn the Effigy"
            type="Album"
            year={2015}
            credits={[
              "Produced, written, and performed by Jesse Spencer",
              "Mixed and mastered at Sun Room Audio",
            ]}
          />
          <DiscographyItem
            title="Brand New Day"
            type="EP"
            year={2012}
          />
        </div>
      </Section>

      <Section theme="light">
        <h2 className={styles.sectionHeading}>Collaborations</h2>
        <p className={styles.sectionSubhead}>
          These are some projects I&rsquo;ve enjoyed the most.
        </p>
        <div className={styles.collabs}>
          <CollabCard
            name="Leash of Foxes"
            description="Intricate melodies. Hard hitting drums."
            role="Drums"
          />
          <CollabCard
            name="The Wild After"
            description="Catchy indie folk rock."
            role="Drums"
          />
        </div>
      </Section>

      <Footer />
    </>
  );
}
