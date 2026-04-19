import type { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/ui/WhatsAppFloat";
import { AreaPageTemplate } from "../components/areas/AreaPageTemplate";
import { AREAS_CONTENT } from "../lib/areas-content";

const area = AREAS_CONTENT.penal;

export const metadata: Metadata = area.metadata;

export default function PenalPage() {
  return (
    <>
      <Navbar />
      <AreaPageTemplate slug="penal" />
      <Footer />
      <WhatsAppFloat
        message={area.whatsapp.message}
        label={area.whatsapp.buttonLabel}
      />
    </>
  );
}
