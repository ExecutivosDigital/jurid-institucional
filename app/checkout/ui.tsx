/**
 * Peças do /checkout (tema claro, padrão Hotmart com a marca JuridIA).
 *
 * Altura de 46-48px nos campos, label acima, erro anunciado por
 * `role="alert"` — o mesmo contrato de acessibilidade da LP, só que
 * sobre fundo branco.
 */

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

type FieldProps = {
  label: string;
  error?: string | null;
  hint?: string;
  adornment?: ReactNode;
  mask?: (v: string) => string;
  value: string;
  onValueChange: (v: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export function Field({
  label,
  error,
  hint,
  adornment,
  mask,
  value,
  onValueChange,
  className = "",
  ...input
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-semibold text-ck-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          value={value}
          onChange={(e) => onValueChange(mask ? mask(e.target.value) : e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`h-[46px] w-full rounded-md border bg-white px-3.5 text-[14.5px] text-ck-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#9aa3b2] ${
            error
              ? "border-red-500 focus:shadow-[0_0_0_3px_rgba(220,38,38,.14)]"
              : "border-ck-line-strong focus:border-ck-gold focus:shadow-[0_0_0_3px_rgba(171,142,99,.18)]"
          } ${adornment ? "pr-12" : ""}`}
          {...input}
        />
        {adornment && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">{adornment}</span>
        )}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1 flex items-center gap-1.5 text-[12.5px] text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[12.5px] text-ck-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}

/** Bloco branco com título — as "seções" do checkout. */
export function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-5 pt-5 sm:px-[22px] ${className}`}>
      {title && (
        <h2 className="mb-3.5 font-display text-[16px] font-bold tracking-[-.2px] text-ck-ink">{title}</h2>
      )}
      {children}
    </section>
  );
}

/** Opção de pagamento com radio, cabeçalho clicável e corpo colapsável. */
export function PayOption({
  selected,
  onSelect,
  icon,
  name,
  note,
  aside,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
  name: string;
  note?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={`mb-3 overflow-hidden rounded-lg border bg-white transition-colors duration-150 ${
        selected ? "border-[1.5px] border-ck-navy" : "border-ck-line-strong hover:border-ck-gold"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="flex min-h-[56px] w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left"
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? "border-ck-navy" : "border-[#b6bdcb]"
          }`}
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-ck-navy" />}
        </span>
        <span className={selected ? "text-ck-navy" : "text-ck-ink-muted"}>{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-bold text-ck-ink">{name}</span>
          {note && <span className="block text-[12.5px] text-ck-ink-muted">{note}</span>}
        </span>
        {aside}
      </button>
      {selected && <div className="border-t border-ck-line bg-[#f7f6f4] px-4 py-4">{children}</div>}
    </div>
  );
}
