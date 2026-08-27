/** Marcas de pagamento em SVG (herdam a cor do pai). Nada de emoji. */

export function PixMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 2.6 21.4 12 12 21.4 2.6 12 12 2.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 7.4 16.6 12 12 16.6 7.4 12 12 7.4Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}

export function MastercardMark({ className = "h-5 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-hidden="true">
      <circle cx="12" cy="10" r="6" fill="currentColor" opacity=".9" />
      <circle cx="20" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" opacity=".9" />
    </svg>
  );
}

export function VisaMark({ className = "h-5 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-hidden="true">
      <text
        x="16"
        y="14.5"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        fontWeight="800"
        fontStyle="italic"
        letterSpacing=".5"
        fill="currentColor"
      >
        VISA
      </text>
    </svg>
  );
}

export function WordMark({ label, className = "h-5 w-9" }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 36 20" className={className} aria-hidden="true">
      <text
        x="18"
        y="14"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing=".3"
        fill="currentColor"
      >
        {label}
      </text>
    </svg>
  );
}

/** Faixa de bandeiras aceitas. */
export function AcceptedBrands({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`} aria-label="Formas de pagamento aceitas">
      <VisaMark className="h-4 w-7" />
      <MastercardMark className="h-4 w-7" />
      <WordMark label="ELO" className="h-4 w-8" />
      <WordMark label="AMEX" className="h-4 w-9" />
      <WordMark label="HIPER" className="h-4 w-10" />
      <PixMark className="h-4 w-4" />
    </span>
  );
}
