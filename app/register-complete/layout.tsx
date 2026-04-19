import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../institucional-2/institucional-2.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Criar conta — JuridIA",
  description:
    "Crie sua conta para começar a usar a JuridIA e liberar o plano escolhido.",
};

export default function RegisterCompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`institucional-2 ${jakarta.variable}`}>{children}</div>
  );
}
