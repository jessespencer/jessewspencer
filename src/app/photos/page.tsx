import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StickyNav from "@/components/ui/StickyNav";
import Footer from "@/components/layout/Footer";
import PhotosGallery from "./PhotosGallery";

export const metadata: Metadata = {
  title: "Photos",
  description: "My favorite shots from years of adventures.",
};

export default function PhotosPage() {
  return (
    <>
      <PageHero
        headline="My favorite shots from years of adventures."
        imageSrc="/images/photos/national-parks/jesse-spencer-photography-yosemite.jpg"
        imageAlt="Yosemite"
      />
      <StickyNav
        links={[
          { label: "Astrophotography", href: "#astrophotography" },
          { label: "National Parks", href: "#national-parks" },
          { label: "People", href: "#people" },
        ]}
      />
      <PhotosGallery />
      <Footer />
    </>
  );
}
