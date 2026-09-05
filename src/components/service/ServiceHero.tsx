import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { company } from '@/data/company'
import { serviceCovers } from '@/data/media'
import type { Service } from '@/data/types'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

/** Hero claro da página de serviço, com breadcrumb e CTA específico do serviço. */
export function ServiceHero({ service }: { service: Service }) {
  const whatsapp = buildWhatsAppUrl(company.whatsapp.tecnico, service.whatsappMessage)
  return (
    <section className="border-b border-line bg-surface pt-28 pb-16 sm:pt-36">
      <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <nav aria-label="Você está em" className="eyebrow text-ink-faint">
            <Link href="/" className="hover:text-brand-600">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#servicos" className="hover:text-brand-600">
              Serviços
            </Link>
          </nav>
          <p className="eyebrow mt-6 text-brand-600">Assistência técnica</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{service.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-muted">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsapp} external variant="whatsapp" size="lg" testId="service-cta">
              <WhatsAppIcon className="size-5" />
              Pedir orçamento
            </Button>
            <Button href="#processo" variant="outline" size="lg">
              Como funciona
            </Button>
          </div>
        </div>
        <Photo
          asset={serviceCovers[service.slug]}
          className="aspect-[4/3] w-full rounded-3xl"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
        />
      </div>
    </section>
  )
}
