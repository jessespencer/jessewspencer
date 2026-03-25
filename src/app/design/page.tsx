import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/layout/Footer";
import DesignGallery from "./DesignGallery";

export const metadata: Metadata = {
  title: "Design",
  description: "Beautiful, human centered products by Jesse W Spencer.",
};

export default function DesignPage() {
  return (
    <>
      <PageHero
        headline="I design the systems that shape products."
        imageSrc="/images/portrait.jpg"
        imageAlt="Jesse Spencer"
      />
      <DesignGallery />
      <Footer />
    </>
  );
}
