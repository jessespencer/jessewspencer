import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Nav from "@/components/layout/Nav";
import PageTransition from "@/components/layout/PageTransition";
import "@/styles/global.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jesse W Spencer | Senior Product Design Architect",
    template: "%s | Jesse W Spencer",
  },
  description:
    "I'm Jesse, a design leader and multi-disciplinary creative in Denver, CO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={spaceGrotesk.variable}
      style={{ ["--font-body" as string]: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <body>
        <Nav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
