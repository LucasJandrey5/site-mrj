import { Brands } from '@/components/sections/Brands'
import { Coverage } from '@/components/sections/Coverage'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { Faq } from '@/components/sections/Faq'
import { Hero } from '@/components/sections/Hero'
import { Lab } from '@/components/sections/Lab'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'
import { JsonLd } from '@/components/seo/JsonLd'
import { landingFaq } from '@/data/faq'
import { localBusinessJsonLd } from '@/lib/seo'

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <Stats />
      <Services />
      <Brands />
      <Process />
      <Lab />
      <Coverage />
      <Faq items={landingFaq} />
      <CtaFinal />
    </>
  )
}
