import type { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/ui/WhatsAppFloat";
import { AreaPageTemplate } from "../components/areas/AreaPageTemplate";
import { AREAS_CONTENT } from "../lib/areas-content";

const area = AREAS_CONTENT.consumidor;

export const metadata: Metadata = area.metadata;

export default function ConsumidorPage() {
  return (
    <>
      <Navbar />
      <AreaPageTemplate slug="consumidor" />
      <Footer />
      <WhatsAppFloat
        message={area.whatsapp.message}
        label={area.whatsapp.buttonLabel}
      />
    </>
  );
}
