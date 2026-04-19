import { Navbar } from "../institucional-2/components/layout/Navbar";
import { Footer } from "../institucional-2/components/layout/Footer";
import { MegaCTA } from "../institucional-2/components/sections/MegaCTA";
import { StoriesGallery } from "../institucional-2/components/sections/StoriesGallery";
import { WhatsAppFloat } from "../institucional-2/components/ui/WhatsAppFloat";
import { PricingContratar } from "./PricingContratar";

export default function ContratarPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingContratar />
        <StoriesGallery />
        <MegaCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
