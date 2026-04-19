import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../institucional-2/institucional-2.css";
import { MobileToolbar } from "../institucional-2/components/layout/MobileToolbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contratar — JuridIA",
  description:
    "Escolha o plano ideal para o seu escritório e comece a usar a JuridIA hoje mesmo.",
  openGraph: {
    title: "Contratar — JuridIA",
    description:
      "Escolha o plano ideal para o seu escritório e comece a usar a JuridIA hoje mesmo.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function ContratarLayout({
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
