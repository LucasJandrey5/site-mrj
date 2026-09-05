import { Brands } from '@/components/sections/Brands'
import { Coverage } from '@/components/sections/Coverage'
import { Hero } from '@/components/sections/Hero'
import { Lab } from '@/components/sections/Lab'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Brands />
      <Process />
      <Lab />
      <Coverage />
    </>
  )
}
