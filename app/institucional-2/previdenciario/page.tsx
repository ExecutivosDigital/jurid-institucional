import type { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/ui/WhatsAppFloat";
import { AreaPageTemplate } from "../components/areas/AreaPageTemplate";
import { AREAS_CONTENT } from "../lib/areas-content";

const area = AREAS_CONTENT.previdenciario;

export const metadata: Metadata = area.metadata;

export default function PrevidenciarioPage() {
  return (
    <>
      <Navbar />
      <AreaPageTemplate slug="previdenciario" />
      <Footer />
      <WhatsAppFloat
        message={area.whatsapp.message}
        label={area.whatsapp.buttonLabel}
      />
    </>
  );
}
