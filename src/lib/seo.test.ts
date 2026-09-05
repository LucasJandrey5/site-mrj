import { describe, expect, it } from 'vitest'
import { services } from '@/data/services'
import { localBusinessJsonLd, serializeJsonLd, serviceJsonLd } from './seo'

describe('localBusinessJsonLd', () => {
  it('tem os campos obrigatórios do LocalBusiness', () => {
    const ld = localBusinessJsonLd()
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('LocalBusiness')
    expect(ld.name).toBe('MRJ Tecnologia')
    expect(ld.telephone).toBe('+5549999052518')
    expect(ld.address).toMatchObject({
      '@type': 'PostalAddress',
      addressLocality: 'Chapecó',
      addressRegion: 'SC',
      addressCountry: 'BR',
    })
    expect(ld.sameAs).toContain('https://www.instagram.com/mrjtecnologia')
  })
})

describe('serviceJsonLd', () => {
  it('descreve o serviço com provider e url canônica', () => {
    const ld = serviceJsonLd(services[0])
    expect(ld['@type']).toBe('Service')
    expect(ld.name).toBe(services[0].title)
    expect(ld.url).toBe('https://mrjtecnologia.com.br/servicos/controladores-de-grupo-gerador')
    expect(ld.provider).toMatchObject({ '@type': 'LocalBusiness', name: 'MRJ Tecnologia' })
  })
})

describe('serializeJsonLd', () => {
  it('escapa < para evitar fechamento de script', () => {
    expect(serializeJsonLd({ a: '</script><b>' })).toBe('{"a":"\\u003c/script>\\u003cb>"}')
  })
})
