import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { company } from '@/data/company'
import { pcbMacroDataUri } from '@/lib/pcb-macro'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const whatsapp = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)

// A placa é gerada no build e viaja embutida no HTML: o título já nasce
// preenchido, sem segunda requisição e sem piscar transparente.
const placa = pcbMacroDataUri('hero')

/**
 * Abertura clara — a única do site — com o título recortado na macro da placa.
 * O contraste com o azul-marinho da faixa de números logo abaixo é proposital.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-paper pt-28 pb-20"
    >
      <div className="hero-light absolute inset-0 -z-10" aria-hidden="true" />

      {/* `container-type` fica aqui: é a largura desta caixa que dá a escala do título. */}
      <div className="container-x hero-frame text-center">
        <p className="eyebrow animate-fade-in text-brand-600">Assistência técnica especializada</p>

        <h1 className="pcb-text mt-1 font-display leading-[0.86] font-extrabold uppercase" style={{ backgroundImage: placa }}>
          {/* O espaço antes da quebra não aparece na tela, mas mantém as duas
              palavras separadas para leitor de tela e para copiar e colar. */}
          {'Eletrônica '}
          <br />
          industrial
        </h1>

        <p className="animate-fade-in mx-auto mt-6 max-w-[46ch] text-lg text-ink-muted [animation-delay:0.55s] sm:text-xl">
          Reparada por quem entende de geradores, inversores e empilhadeiras. Diagnóstico em laboratório próprio,
          reparo a nível de componente e orçamento gratuito.
        </p>

        <div className="animate-fade-in mt-9 flex flex-wrap justify-center gap-3 [animation-delay:0.68s]">
          <Button href={whatsapp} external variant="whatsapp" size="lg" testId="hero-cta">
            <WhatsAppIcon className="size-5" />
            Falar com o técnico
          </Button>
          <Button href="#servicos" variant="outline" size="lg">
            Ver serviços
          </Button>
        </div>

        <p className="eyebrow animate-fade-in mt-12 text-ink-faint [animation-delay:0.8s]">
          {company.address.city}, {company.address.state}. Atendimento em todo o Brasil.
        </p>
      </div>
    </section>
  )
}
