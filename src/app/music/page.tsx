import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StickyNav from "@/components/ui/StickyNav";
import Section from "@/components/layout/Section";
import DiscographyItem from "@/components/ui/DiscographyItem";
import CollabCard from "@/components/ui/CollabCard";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Music",
  description:
    "For as long as I can remember, I've been playing music. Breach and Bellow, collaborations, and more.",
};

export default function MusicPage() {
  return (
    <>
      <PageHero
        headline="Music has always been the throughline."
        imageSrc="/images/jesse-spencer-breach-bellow-portrait-light-wall-guitar-photo.jpg"
        imageAlt="Jesse Spencer playing guitar with warm stage lights — Breach and Bellow"
      />

      <StickyNav
        links={[
          { label: "Bio", href: "#bio" },
          { label: "Breach and Bellow", href: "#breach-and-bellow" },
          { label: "Collaborations", href: "#collaborations" },
        ]}
      />

      <Section theme="light" className={styles.bio} id="bio">
        <div className={styles.bioText}>
          <h2 className={styles.bioHeading}>
            As a drummer, I&rsquo;ve toured with Atlantic Records artist Matt Hires,
            supporting Matchbox Twenty, the Goo Goo Dolls, and Parachute.
          </h2>
          <h2 className={styles.bioHeading}>
            I&rsquo;ve performed on VH1 and AXS TV, played radio stations
            across the U.S., and shared stages with Copeland, Lifehouse, Mat
            Kearney, and others.
          </h2>
          <h2 className={styles.bioHeading}>
            Now I write, record, and produce under Breach and
            Bellow&mdash;ambitious, vulnerable songs that blend acoustic folk,
            cinematic soundscapes, and intimate lyricism.
          </h2>
        </div>
        <img
          src="/images/jesse-spencer-breach-and-bellow-portrait-greenery.jpg"
          alt="Jesse Spencer — Breach and Bellow"
          className={styles.bioImage}
        />
      </Section>

      <Section theme="dark" className={styles.discSection} id="breach-and-bellow">
        <h2 className={styles.sectionHeading}>Breach and Bellow</h2>
        <p className={styles.sectionSubhead}>
          My personal songwriting project.
        </p>
        <div className={styles.discRow}>
          <div className={styles.discLabel}>All I Have<span className={styles.discYear}>2018</span></div>
          <div className={styles.discEmbed}>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/ci1KYQNrNZw"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className={styles.discRow}>
          <div className={styles.discLabel}>Burn the Effigy<span className={styles.discYear}>2015</span></div>
          <div className={styles.discEmbed}>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/7CYnTYA1LfE"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/06KaXdmqqR8"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/album/6kRXjCJl8vooYXgsFO6dBl?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles.divider} />
      </Section>

      <Section theme="dark" className={styles.collabSection} id="collaborations">
        <h2 className={styles.sectionHeading}>Collaborations</h2>
        <p className={styles.sectionSubhead}>
          These are some projects I&rsquo;ve enjoyed the most.
        </p>
        <div className={styles.discRow}>
          <div className={styles.discLabel}>Leash of Foxes<span className={styles.discYear}>2015</span></div>
          <div className={styles.discEmbed}>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/iEhUyIk2l5I"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/album/6xCgLVt2zFAng7ODnTrMmM?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles.discRow}>
          <div className={styles.discLabel}>The Wild After<span className={styles.discYear}>2020</span></div>
          <div className={styles.discEmbed}>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/6bneuJe2P5E"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/album/6XLcIQWNqxQIrXzh6X68AZ?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
