import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { VideoShowcase } from "./components/sections/VideoShowcase";
import { NumbersSection } from "./components/sections/NumbersSection";
import { ProductShowcase } from "./components/sections/ProductShowcase";
import { StoriesGallery } from "./components/sections/StoriesGallery";
import { PricingSection } from "./components/sections/PricingSection";
import { MegaCTA } from "./components/sections/MegaCTA";
import { WhatsAppFloat } from "./components/ui/WhatsAppFloat";

// Toggle a seção de Planos/Preços. Mude para `true` para religar.
const SHOW_PRICING = false;

export default function Institucional2Page() {
  return (
    <>
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
          ctaHref="#experimente"
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
          ctaHref="https://voice.juridia.com.br/register"
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
    </>
  );
}
