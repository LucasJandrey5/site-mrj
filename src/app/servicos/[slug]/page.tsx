import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { Faq } from '@/components/sections/Faq'
import { Process } from '@/components/sections/Process'
import { JsonLd } from '@/components/seo/JsonLd'
import { ServiceDetails } from '@/components/service/ServiceDetails'
import { ServiceHero } from '@/components/service/ServiceHero'
import { getService, services } from '@/data/services'
import { serviceJsonLd } from '@/lib/seo'

// Next 16: `params` chega como Promise.
type Props = { params: Promise<{ slug: string }> }

// Só os slugs de generateStaticParams existem; qualquer outro responde 404.
export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: { title: `${service.title} | MRJ Tecnologia`, description: service.summary },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <ServiceHero service={service} />
      <ServiceDetails service={service} />
      <Process compact />
      <Faq items={service.faq} title="Dúvidas sobre este serviço" id="faq-servico" />
      <CtaFinal message={service.whatsappMessage} />
    </>
  )
}
