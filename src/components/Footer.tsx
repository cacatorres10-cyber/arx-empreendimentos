import Link from "next/link";
import Logo from "@/components/Logo";
import { site, whatsappLink } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-on-night">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Logo size="2.4rem" onDark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-night-muted">
              Construtora e incorporadora de alto padrão em {site.city} e no
              litoral de Santa Catarina. Do projeto à entrega, obra própria.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="eyebrow eyebrow-on-night">Navegação</h3>
            <ul className="mt-5 space-y-3 text-sm text-on-night-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/empreendimentos"
                  className="transition-colors hover:text-white"
                >
                  Empreendimentos
                </Link>
              </li>
              <li>
                <Link
                  href="/#sobre"
                  className="transition-colors hover:text-white"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/#contato"
                  className="transition-colors hover:text-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="eyebrow eyebrow-on-night">Contato</h3>
            <ul className="mt-5 space-y-3 text-sm text-on-night-muted">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li className="max-w-xs leading-relaxed">{site.address}</li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="eyebrow eyebrow-on-night">Redes</h3>
            <ul className="mt-5 space-y-3 text-sm text-on-night-muted">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-on-night-muted sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. Todos os direitos reservados. CNPJ{" "}
            {site.cnpj}
          </p>
          <p>
            {site.city}/{site.region} · Construindo desde {site.foundedYear}
          </p>
        </div>
        <p className="mt-4 text-[0.65rem] text-on-night-muted/70">
          Foto da capa: Balneário de Navegantes — Wikimedia Commons (CC BY-SA
          3.0). Imagem provisória, a ser substituída por acervo próprio da ARX.
        </p>
      </div>
    </footer>
  );
}
