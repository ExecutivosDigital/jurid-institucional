"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

interface ProductShowcaseProps {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  videoLabel: string;
  videoBigLetter: string;
  ctaHref: string;
  ctaLabel: string;
  reverse?: boolean;
  videoSrc?: string;
}

export function ProductShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  videoLabel,
  videoBigLetter,
  ctaHref,
  ctaLabel,
  reverse = false,
  videoSrc,
}: ProductShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  }

  return (
    <section className="i2-product" id={id}>
      <div className="i2-container">
        <div
          className={`i2-product__grid${
            reverse ? " i2-product__grid--reverse" : ""
          }`}
        >
          <div
            className="i2-product__media"
            role="img"
            aria-label={`Demonstração ${title}`}
          >
            {videoSrc ? (
              <>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  controls={playing}
                  playsInline
                  preload="metadata"
                  onEnded={() => setPlaying(false)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                    zIndex: 2,
                  }}
                />
                {!playing && (
                  <>
                    <span className="i2-product__media-caption" style={{ zIndex: 3 }}>
                      <span className="i2-product__media-dot" aria-hidden="true" />
                      {videoLabel}
                    </span>
                    <button
                      type="button"
                      className="i2-product__media-play"
                      aria-label={`Reproduzir vídeo ${title}`}
                      onClick={handlePlay}
                      style={{ zIndex: 3 }}
                    >
                      <Play size={26} strokeWidth={1.75} fill="currentColor" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="i2-product__media-bg" aria-hidden="true" />
                <div className="i2-product__media-letter" aria-hidden="true">
                  {videoBigLetter}
                </div>
                <div className="i2-product__media-overlay" aria-hidden="true" />

                <span className="i2-product__media-caption">
                  <span className="i2-product__media-dot" aria-hidden="true" />
                  {videoLabel}
                </span>

                <button
                  type="button"
                  className="i2-product__media-play"
                  aria-label={`Reproduzir vídeo ${title}`}
                >
                  <Play size={26} strokeWidth={1.75} fill="currentColor" />
                </button>
              </>
            )}
          </div>

          <div className="i2-product__content">
            <span className="i2-product__eyebrow">{eyebrow}</span>
            <h2 className="i2-product__title">{title}</h2>
            <p className="i2-product__subtitle">{subtitle}</p>
            <div className="i2-product__cta">
              <Link href={ctaHref} className="i2-btn i2-btn--primary">
                {ctaLabel}
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
