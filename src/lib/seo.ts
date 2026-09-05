import { allBrands } from '@/data/brands'
import { company } from '@/data/company'
import type { Service } from '@/data/types'

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: company.description,
    url: company.siteUrl,
    email: company.email,
    telephone: `+${company.whatsapp.tecnico}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: company.address.country,
    },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    sameAs: [company.instagramUrl],
    knowsAbout: allBrands,
  }
}

export function serviceJsonLd(service: Service): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: 'Assistência técnica em eletrônica industrial',
    url: `${company.siteUrl}/servicos/${service.slug}`,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    provider: {
      '@type': 'LocalBusiness',
      name: company.name,
      url: company.siteUrl,
      telephone: `+${company.whatsapp.tecnico}`,
    },
  }
}

/** JSON.stringify com `<` escapado, como recomenda a doc do Next para JSON-LD. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
