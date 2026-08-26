import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "./components/ui/SmoothScroll";
import "./v3.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

// Serifa de alto contraste: dá autoridade jurídica sem parecer template SaaS.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

// Mono para rótulos e eyebrows — precisão de documento técnico.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JuridIA — Seu escritório inteiro numa tela só",
  description:
    "IA jurídica brasileira que conversa, pesquisa, calcula, consulta, monitora, organiza e cobra. Chat ilimitado, ~95 consultas oficiais, 13 áreas de cálculo e varredura diária do DJEN.",
  openGraph: {
    title: "JuridIA — Seu escritório inteiro numa tela só",
    description: "Um dia inteiro de trabalho em um minuto.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function V3Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`v3 ${jakarta.variable} ${playfair.variable} ${mono.variable}`}
    >
      <SmoothScroll />
      {children}
    </div>
  );
}
