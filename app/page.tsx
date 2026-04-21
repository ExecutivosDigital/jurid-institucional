import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "./institucional-2/components/layout/Footer";
import { MobileToolbar } from "./institucional-2/components/layout/MobileToolbar";
import { Navbar } from "./institucional-2/components/layout/Navbar";
import { HeroSection } from "./institucional-2/components/sections/HeroSection";
import { MegaCTA } from "./institucional-2/components/sections/MegaCTA";
import { NumbersSection } from "./institucional-2/components/sections/NumbersSection";
import { PricingSection } from "./institucional-2/components/sections/PricingSection";
import { ProductShowcase } from "./institucional-2/components/sections/ProductShowcase";
import { StoriesGallery } from "./institucional-2/components/sections/StoriesGallery";
import { VideoShowcase } from "./institucional-2/components/sections/VideoShowcase";
import { WhatsAppFloat } from "./institucional-2/components/ui/WhatsAppFloat";
import "./institucional-2/institucional-2.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JuridIA — Inteligência Artificial para Advogados",
  description:
    "Um dia inteiro de trabalho em 1 minuto. Automatize petições, consulte jurisprudências e otimize sua rotina jurídica com IA especializada em direito brasileiro.",
  openGraph: {
    title: "JuridIA — Inteligência Artificial para Advogados",
    description: "Um dia inteiro de trabalho em 1 minuto.",
    locale: "pt_BR",
    type: "website",
  },
};
const SHOW_PRICING = false;

export default function HomePage() {
  return (
    <div className={`institucional-2 ${jakarta.variable}`}>
      <Navbar />
      <main>
        <HeroSection />
        <VideoShowcase />
        <NumbersSection />

        <ProductShowcase
          id="chat"
          eyebrow="JuridIA Chat"
          title="Melhor que o ChatGPT para advogados brasileiros"
          subtitle="Converse com uma IA jurídica que entende o direito brasileiro como ninguém. Peça uma petição inicial, faça uma pesquisa de jurisprudência, tire dúvidas sobre súmulas — tudo em linguagem natural. Treinada com legislação, doutrina e milhões de julgados dos tribunais nacionais para responder com fundamento e contexto real."
          videoLabel="Demo · Chat em ação"
          videoBigLetter="CHAT"
          ctaHref="/plans"
          ctaLabel="Testar agora"
          videoSrc="/videos/juridia-demo-chat.mp4"
        />

        <ProductShowcase
          id="voice"
          eyebrow="JuridIA Voice"
          title="Grave conversas e Reuniões online e presenciais"
          subtitle="Grave audiências, reuniões com clientes e sustentações orais. A IA transcreve em tempo real, identifica os pontos jurídicos relevantes e gera atas, resumos executivos e memorandos prontos para o processo. É como o Plaud e o tl;dv — só que afinado para a rotina dos escritórios brasileiros."
          videoLabel="Demo · Voice em ação"
          videoBigLetter="VOICE"
          ctaHref="/plans"
          ctaLabel="Testar agora"
          reverse
          videoSrc="/videos/juridia-demo-voice.mp4"
        />

        <StoriesGallery />
        {SHOW_PRICING && <PricingSection />}
        <MegaCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileToolbar />
    </div>
  );
}
