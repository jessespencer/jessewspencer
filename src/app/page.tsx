import Hero from "@/components/ui/Hero";
import Section from "@/components/layout/Section";
import ExperienceCards from "@/components/ui/ExperienceCard";
import DarkBlock from "@/components/ui/DarkBlock";
import Footer from "@/components/layout/Footer";
import DayforceLogo from "@/components/icons/DayforceLogo";
import WorkdayLogo from "@/components/icons/WorkdayLogo";
import DeloitteLogo from "@/components/icons/DeloitteLogo";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Hero
        headline="I design the systems that shape products."
        imageSrc="/images/portrait.jpg"
        imageAlt="Jesse Spencer portrait"
      />

      <Section theme="light" className={styles.bio}>
        <div className={styles.bioText}>
          <h2 className={styles.bioHeading}>
            I&rsquo;ve spent the past 15+ years{" "}
            <a href="/design" className={styles.bioLink}>
              designing
            </a>{" "}
            beautiful, human-centered products.
          </h2>
          <h2 className={styles.bioHeading}>
            Currently, I&rsquo;m Product Design Architect{" "}
            <a
              href="https://www.dayforce.com"
              className={styles.bioLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              @Dayforce
            </a>
            , leading creative direction and design strategy for a multi-product
            portfolio.
          </h2>
          <h2 className={styles.bioHeading}>
            Previously, I was Creative Director{" "}
            <a
              href="https://canvas.workday.com/"
              className={styles.bioLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              @Workday
            </a>
            , and led an evolution of their open source design system to create
            scalable, unified experiences.
          </h2>
        </div>
        <ExperienceCards
          items={[
            {
              company: "Dayforce",
              logo: <DayforceLogo style={{ height: 24 }} />,
              title: "Product Design Architect",
              years: "2021\u2013Present",
              description:
                "Leading design strategy across Everest, platform patterns, and future vision initiatives for Dayforce.",
            },
            {
              company: "Workday",
              logo: <WorkdayLogo style={{ height: 40 }} />,
              title: "Creative Director",
              years: "2015\u20132021",
              description:
                "Scaled the Canvas Design System, launched it on GitHub, and led vision initiatives across the product.",
            },
            {
              company: "GridCraft",
              title: "Product Designer",
              years: "2013\u20132015",
              description:
                "Built a spreadsheet iPad app with the founding team, leading to a Workday acquisition and a US patent.",
            },
            {
              company: "Deloitte Digital",
              logo: <DeloitteLogo style={{ height: 16 }} />,
              title: "Visual Designer",
              years: "2012\u20132013",
              description:
                "Designed iOS and Android products for Kaiser Permanente, Blue Cross Blue Shield, and Philips Healthcare.",
            },
          ]}
        />
      </Section>

      <Section theme="dark" className={styles.darkSection}>
        <DarkBlock
          label="Expertise"
          headlines={[
            "Art Direction",
            "Interaction Design",
            "Design Systems",
            "Prototyping",
            "Strategy and Vision",
          ]}
        />
        <DarkBlock
          label="Awards"
          headlines={[
            "US Patent",
            "Apple\u2019s New and Noteworthy",
            "Yahoo!\u2019s App of the Week",
            "AppAdvice\u2019s Best Apps",
          ]}
          body={"United States Patent holder for a touch screen interaction pattern at Gridcraft. Every Body Walk! earned Apple\u2019s New and Noteworthy, Yahoo!\u2019s App of the Week, and AppAdvice\u2019s Today\u2019s Best Apps."}
        />
        <DarkBlock
          label="Speaking"
          headlines={[
            "Zapier",
            "Dayforce Discover",
            "Ceridian Insights",
            "Disruptor Summit",
            "Workday Design Week",
          ]}
          body={"Most recently, I\u2019ve spoken at Zapier on iterating toward the future, at Dayforce Discover on human-centered innovation, and at Ceridian\u2019s Disruptor Summit on how a design system becomes the backbone of a product portfolio."}
        />
      </Section>

      <Footer />
    </>
  );
}
