import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import Section from "@/components/layout/Section";
import PhotoGrid from "@/components/ui/PhotoGrid";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Photos",
  description: "My favorite shots from years of adventures.",
};

const placeholder = (count: number, ratio = "4 / 3") =>
  Array.from({ length: count }, (_, i) => ({
    alt: `Photo ${i + 1}`,
    aspectRatio: ratio,
  }));

export default function PhotosPage() {
  return (
    <>
      <Hero
        headline="Photos"
        subhead="My favorite shots from years of adventures."
        imageSrc=""
        imageAlt="Photos"
      />

      <Section theme="light">
        <PhotoGrid
          label="Astrophotography"
          photos={placeholder(4, "16 / 9")}
        />
        <PhotoGrid
          label="National Parks"
          photos={placeholder(6, "4 / 3")}
        />
        <PhotoGrid
          label="People"
          photos={placeholder(1, "3 / 4")}
        />
        <PhotoGrid
          label="Time-Lapse"
          photos={placeholder(1, "16 / 9")}
        />
      </Section>

      <Footer />
    </>
  );
}
