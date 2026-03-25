import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import Section from "@/components/layout/Section";
import FeaturedProject from "@/components/ui/FeaturedProject";
import ProjectCard from "@/components/ui/ProjectCard";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design",
  description: "Beautiful, human centered products by Jesse W Spencer.",
};

export default function DesignPage() {
  return (
    <>
      <Hero
        headline="Design"
        subhead="Beautiful, human centered products."
        imageSrc=""
        imageAlt="Design portrait"
      />

      <Section theme="light">
        <FeaturedProject
          title="Cache Wallet"
          description="Visual design for the iOS app."
          href="/design/cache-wallet"
        />
        <FeaturedProject
          title="The Canvas Design System"
          description="Creative direction for Workday."
          href="/design/canvas"
        />
        <FeaturedProject
          title="Every Body Walk!"
          description="Product design for Kaiser Permanente."
          href="/design/ebw"
        />
      </Section>

      <Section theme="light">
        <h2 className={styles.sectionHeading}>All Projects</h2>
        <div className={styles.grid}>
          <ProjectCard
            title="Workday Phoenix"
            description="Product wide redesign for the Android App."
            href="/design/workday-phoenix"
          />
          <ProjectCard
            title="UI Collection"
            description="Beautiful custom interfaces."
            href="/design/ui-collection"
          />
          <ProjectCard
            title="Album Artwork"
            description="Graphic design for bands and musicians."
            href="/design/album-artwork"
          />
          <ProjectCard
            title="Logo Collection"
            description="Visual identities for brands."
            href="/design/logo-collection"
          />
        </div>
      </Section>

      <Section theme="light" className={styles.archiveCta}>
        <a href="/archive" className={styles.archiveLink}>
          Creative projects from the past &rarr;
        </a>
      </Section>

      <Footer />
    </>
  );
}
