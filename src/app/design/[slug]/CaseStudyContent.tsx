"use client";

import Section from "@/components/layout/Section";
import ImageReveal from "@/components/ui/ImageReveal";
import NextProject from "@/components/ui/NextProject";
import Footer from "@/components/layout/Footer";
import type { ProjectFrontmatter } from "@/lib/content";
import styles from "./page.module.css";

interface CaseStudyContentProps {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export default function CaseStudyContent({
  frontmatter,
}: CaseStudyContentProps) {
  return (
    <>
      <Section theme="dark" className={styles.hero}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <p className={styles.subtitle}>{frontmatter.subtitle}</p>
      </Section>

      {frontmatter.hero && (
        <Section theme="light" className={styles.heroImage}>
          <ImageReveal
            src={frontmatter.hero}
            alt={`${frontmatter.title} hero`}
            aspectRatio="16 / 9"
          />
        </Section>
      )}

      <Section theme="light">
        <div className={styles.meta}>
          {frontmatter.disciplines && (
            <div className={styles.metaCol}>
              <h3 className={styles.metaLabel}>What I Did</h3>
              <ul className={styles.disciplines}>
                {frontmatter.disciplines.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
          {frontmatter.overview && (
            <div className={styles.metaCol}>
              <h3 className={styles.metaLabel}>Overview</h3>
              <p>{frontmatter.overview}</p>
            </div>
          )}
          {frontmatter.goals && (
            <div className={styles.metaCol}>
              <h3 className={styles.metaLabel}>Goals</h3>
              <p>{frontmatter.goals}</p>
            </div>
          )}
        </div>
      </Section>

      {frontmatter.images && frontmatter.images.length > 0 && (
        <Section theme="light">
          <div className={styles.gallery}>
            {frontmatter.images.map((img, i) => (
              <ImageReveal
                key={i}
                src={img}
                alt={`${frontmatter.title} image ${i + 1}`}
                aspectRatio="16 / 9"
              />
            ))}
          </div>
        </Section>
      )}

      {frontmatter.nextProject && (
        <Section theme="light">
          <NextProject
            slug={frontmatter.nextProject.slug}
            title={frontmatter.nextProject.title}
            thumbnail={frontmatter.nextProject.thumbnail}
          />
        </Section>
      )}

      <Footer />
    </>
  );
}
