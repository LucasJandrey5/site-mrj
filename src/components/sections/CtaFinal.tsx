import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const waComercial = buildWhatsAppUrl(company.whatsapp.comercial, WA_MESSAGES.comercial)

/** Bloco escuro de contato; `message` muda a mensagem pré-preenchida do técnico (páginas de serviço). */
export function CtaFinal({ message = WA_MESSAGES.tecnico }: { message?: string }) {
  const waTecnico = buildWhatsAppUrl(company.whatsapp.tecnico, message)
  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y scroll-mt-20 bg-navy-950 text-white">
      <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="eyebrow text-brand-400">Contato</p>
          <h2 id="contato-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Equipamento parado? Mande foto e modelo agora.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Respondemos pelo WhatsApp com as instruções de envio e o próximo passo. Orçamento gratuito.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={waTecnico} external variant="whatsapp" size="lg" testId="cta-final-tecnico">
              <WhatsAppIcon className="size-5" />
              Setor técnico
            </Button>
            <Button href={waComercial} external variant="outline-light" size="lg" testId="cta-final-comercial">
              Comercial
            </Button>
          </div>
        </div>
        <dl className="grid gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm">
          <div>
            <dt className="eyebrow text-white/50">Técnico</dt>
            <dd className="mt-1 text-lg font-semibold">
              <a href={`tel:+${company.whatsapp.tecnico}`} className="hover:text-brand-400">
                {company.phoneDisplay.tecnico}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-white/50">Comercial</dt>
            <dd className="mt-1 text-lg font-semibold">
              <a href={`tel:+${company.whatsapp.comercial}`} className="hover:text-brand-400">
                {company.phoneDisplay.comercial}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-white/50">E-mail</dt>
            <dd className="mt-1">
              <a href={`mailto:${company.email}`} className="hover:text-brand-400">
                {company.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-white/50">Onde estamos</dt>
            <dd className="mt-1 text-white/80">
              {company.address.city}, {company.address.state}. Recebemos equipamentos de todo o Brasil por transportadora.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
