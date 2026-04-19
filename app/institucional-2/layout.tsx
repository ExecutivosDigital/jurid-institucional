import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./institucional-2.css";
import { MobileToolbar } from "./components/layout/MobileToolbar";

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

export default function Institucional2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`institucional-2 ${jakarta.variable}`}>
      {children}
      <MobileToolbar />
    </div>
  );
}
