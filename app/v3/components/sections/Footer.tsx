import Image from "next/image";
import Link from "next/link";
import { featureHref, pillars } from "../../lib/features";

export function Footer() {
  // As colunas espelham os pilares — mesma taxonomia do menu.
  const cols = [
    { title: pillars[0].label, items: pillars[0].features },
    { title: pillars[1].label, items: pillars[1].features },
    { title: pillars[2].label, items: pillars[2].features },
  ];

  return (
    <footer className="v3-footer">
      <div className="v3-wrap">
        <div className="v3-footer__grid">
          <div className="v3-footer__col">
            <Image
              src="/images/logo/logo.png"
              alt="JuridIA"
              width={148}
              height={38}
            />
            <p
              style={{
                marginTop: 18,
                fontSize: 14,
                color: "var(--ink-2)",
                maxWidth: "32ch",
                lineHeight: 1.6,
              }}
            >
              Seu escritório inteiro numa tela só — e uma IA que sabe Direito
              operando ele com você.
            </p>
          </div>

          {cols.map((c) => (
            <div className="v3-footer__col" key={c.title}>
              <h4>{c.title}</h4>
              <div className="v3-footer__links">
                {c.items.map((f) => (
                  <Link key={f.id} href={featureHref(f.id)}>
                    {f.tab}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="v3-footer__bottom">
          <span>
            © {new Date().getFullYear()} JuridIA. Todos os direitos reservados.
          </span>
          <span
            style={{ display: "flex", gap: 18, flexWrap: "wrap" }}
          >
            <Link href="/institucional-2/privacidade">Privacidade</Link>
            <Link href="/institucional-2/termos">Termos</Link>
            <Link href="/institucional-2/faq">FAQ</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
