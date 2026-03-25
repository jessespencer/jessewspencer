import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/design");

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  disciplines?: string[];
  overview?: string;
  goals?: string;
  thumbnail?: string;
  hero?: string;
  images?: string[];
  nextProject?: {
    slug: string;
    title: string;
    thumbnail?: string;
  };
  order: number;
  featured: boolean;
  draft: boolean;
}

export interface ProjectData {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export async function getDesignProjects(): Promise<ProjectData[]> {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  });

  return projects
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

export async function getFeaturedProjects(): Promise<ProjectData[]> {
  const all = await getDesignProjects();
  return all.filter((p) => p.frontmatter.featured);
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectData | null> {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}
