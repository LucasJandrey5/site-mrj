import { Mail, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { Logo } from '@/components/ui/Logo'
import { company } from '@/data/company'
import { services } from '@/data/services'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

// Calculado no escopo do módulo (build) para não chamar new Date() durante o render.
const year = new Date().getFullYear()
const waTecnico = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)
const waComercial = buildWhatsAppUrl(company.whatsapp.comercial, WA_MESSAGES.comercial)

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white/75">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="light" size="footer" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{company.description}</p>
          <a
            href={company.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
          >
            <InstagramIcon className="size-5" />@{company.instagramHandle}
          </a>
        </div>

        <div>
          <p className="eyebrow text-brand-400">Serviços</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}`} className="transition-colors hover:text-white">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-brand-400">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={waTecnico} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle className="size-4" aria-hidden="true" />
                Técnico: {company.phoneDisplay.tecnico}
              </a>
            </li>
            <li>
              <a href={waComercial} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle className="size-4" aria-hidden="true" />
                Comercial: {company.phoneDisplay.comercial}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="size-4" aria-hidden="true" />
                {company.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              {company.address.city}, {company.address.state}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Todos os direitos reservados.
          </p>
          <p>
            Feito em {company.address.city}, {company.address.state}.
          </p>
        </div>
      </div>
    </footer>
  )
}
