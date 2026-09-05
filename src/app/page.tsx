import { Brands } from '@/components/sections/Brands'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Brands />
    </>
  )
}
