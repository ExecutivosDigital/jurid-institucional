import { ImageIcon, Play } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { TrialForm } from "./TrialForm";
import img18 from "../../imagens-videos/juridcerto/18.png";
import img19 from "../../imagens-videos/juridcerto/19.png";
import img20 from "../../imagens-videos/juridcerto/20.png";
import img21 from "../../imagens-videos/juridcerto/21.png";
import img22 from "../../imagens-videos/juridcerto/22.png";
import img23 from "../../imagens-videos/juridcerto/23.png";
import img24 from "../../imagens-videos/juridcerto/24.png";
import img25 from "../../imagens-videos/juridcerto/25.png";
import img26 from "../../imagens-videos/juridcerto/26.png";
import img27 from "../../imagens-videos/juridcerto/27.png";
import img28 from "../../imagens-videos/juridcerto/28.png";
import img29 from "../../imagens-videos/juridcerto/29.png";
import img30 from "../../imagens-videos/juridcerto/30.png";
import img31 from "../../imagens-videos/juridcerto/31.png";
import img32 from "../../imagens-videos/juridcerto/32.png";
import img33 from "../../imagens-videos/juridcerto/33.png";
import img34 from "../../imagens-videos/juridcerto/34.png";

type SlotType = "image" | "video";

interface Slot {
  id: string;
  type: SlotType;
  span: "lg" | "md" | "sm";
  src?: StaticImageData;
}

const SLOTS: Slot[] = [
  // Row 1 — 8 + 4
  { id: "s18", type: "image", span: "lg", src: img18 },
  { id: "s19", type: "image", span: "sm", src: img19 },
  // Row 2 — 4 + 4 + 4
  { id: "s20", type: "image", span: "sm", src: img20 },
  { id: "s21", type: "image", span: "sm", src: img21 },
  { id: "s22", type: "image", span: "sm", src: img22 },
  // Row 3 — 4 + 4 + 4
  { id: "s23", type: "image", span: "sm", src: img23 },
  { id: "s24", type: "image", span: "sm", src: img24 },
  { id: "s25", type: "image", span: "sm", src: img25 },
  // Row 4 — 4 + 4 + 4
  { id: "s26", type: "image", span: "sm", src: img26 },
  { id: "s27", type: "image", span: "sm", src: img27 },
  { id: "s28", type: "image", span: "sm", src: img28 },
  // Row 5 — 4 + 4 + 4
  { id: "s29", type: "image", span: "sm", src: img29 },
  { id: "s30", type: "image", span: "sm", src: img30 },
  { id: "s31", type: "image", span: "sm", src: img31 },
  // Row 6 — 4 + 4 + 4
  { id: "s32", type: "image", span: "sm", src: img32 },
  { id: "s33", type: "image", span: "sm", src: img33 },
  { id: "s34", type: "image", span: "sm", src: img34 },
];

export function StoriesGallery() {
  return (
    <section className="i2-stories" id="depoimentos">
      <div className="i2-container">
        <header className="i2-stories__header">
          <span className="i2-stories__eyebrow">O sistema por dentro</span>
          <h2 className="i2-stories__title">
            Tudo o que o seu escritório precisa em um só lugar
          </h2>
          <p className="i2-stories__subtitle">
            Chat jurídico, Voice para audiências e reuniões, módulo financeiro,
            gestão de processos e muito mais — veja a JuridIA funcionando na
            prática.
          </p>
        </header>

        <div className="i2-stories__grid">
          {SLOTS.map((slot) => (
            <div
              key={slot.id}
              className={`i2-stories__item i2-stories__item--${slot.span} i2-stories__item--${slot.type}`}
              role={slot.src ? undefined : "img"}
              aria-label={
                slot.src
                  ? undefined
                  : `Placeholder ${slot.type === "video" ? "de vídeo" : "de imagem"}`
              }
            >
              {slot.src ? (
                <Image
                  src={slot.src}
                  alt={`História de sucesso - ${slot.id}`}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                />
              ) : (
                <>
                  <div className="i2-stories__pattern" aria-hidden="true" />

                  <span className="i2-stories__badge">
                    {slot.type === "video" ? (
                      <>
                        <Play size={11} strokeWidth={2} fill="currentColor" />
                        Vídeo
                      </>
                    ) : (
                      <>
                        <ImageIcon size={11} strokeWidth={2} />
                        Imagem
                      </>
                    )}
                  </span>

                  <div className="i2-stories__center">
                    {slot.type === "video" ? (
                      <span className="i2-stories__play" aria-hidden="true">
                        <Play size={22} strokeWidth={1.75} fill="currentColor" />
                      </span>
                    ) : (
                      <span className="i2-stories__icon" aria-hidden="true">
                        <ImageIcon size={28} strokeWidth={1.5} />
                      </span>
                    )}
                    <span className="i2-stories__label">Em breve</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <TrialForm />
      </div>
    </section>
  );
}
