import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";

const INSTAGRAM_URL = "#";
const YOUTUBE_URL = "#";

export function Footer() {
  return (
    <footer className="i2-footer">
      <div className="i2-footer__inner">
        <div className="i2-footer__brand">
          <Image
            src="/images/logo/logo-white.png"
            alt="JuridIA"
            width={140}
            height={32}
            className="i2-footer__brand-logo"
          />
        </div>

        <span className="i2-footer__copy">
          © {new Date().getFullYear()} JuridIA. Todos os direitos reservados.
        </span>

        <div className="i2-footer__social" aria-label="Redes sociais">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="i2-footer__social-link"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={2} />
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="i2-footer__social-link"
            aria-label="YouTube"
          >
            <Youtube size={18} strokeWidth={2} />
          </a>
        </div>

        <nav className="i2-footer__links" aria-label="Links rodapé">
          <a href="#privacidade" className="i2-footer__link">
            Privacidade
          </a>
          <a href="#termos" className="i2-footer__link">
            Termos
          </a>
        </nav>
      </div>
    </footer>
  );
}
