import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getDesignProjects } from "@/lib/content";
import CaseStudyContent from "./CaseStudyContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getDesignProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.subtitle,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <CaseStudyContent
      frontmatter={project.frontmatter}
      content={project.content}
    />
  );
}
