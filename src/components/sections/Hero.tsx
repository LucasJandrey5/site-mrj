import { HeroVisual } from '@/components/three/HeroVisual'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const whatsapp = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x grid min-h-svh items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow text-brand-400">Assistência técnica especializada</p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
            Eletrônica industrial reparada por quem entende de geradores, inversores e empilhadeiras.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Controladores de grupo gerador, IHMs, inversores de frequência e solares, módulos de empilhadeiras e
            paleteiras. Diagnóstico em laboratório próprio, reparo a nível de componente e orçamento gratuito.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsapp} external variant="whatsapp" size="lg" testId="hero-cta">
              <WhatsAppIcon className="size-5" />
              Falar com o técnico
            </Button>
            <Button href="#servicos" variant="outline-light" size="lg">
              Ver serviços
            </Button>
          </div>
          <p className="eyebrow mt-8 text-white/40">
            {company.address.city}, {company.address.state}. Atendimento em todo o Brasil.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
