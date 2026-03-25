import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StickyNav from "@/components/ui/StickyNav";
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
      <StickyNav
        links={[
          { label: "Product Design", href: "#selected-works" },
          { label: "Branding", href: "#branding" },
          { label: "Graphic Design", href: "#graphic-design" },
        ]}
      />
      <DesignGallery />
      <Footer />
    </>
  );
}
