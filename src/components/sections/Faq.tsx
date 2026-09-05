import { Accordion } from '@/components/ui/Accordion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { FaqItem } from '@/data/types'

export interface FaqProps {
  items: FaqItem[]
  title?: string
  id?: string
}

export function Faq({ items, title = 'Perguntas frequentes', id = 'faq' }: FaqProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y scroll-mt-20 border-y border-line bg-surface">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id={`${id}-title`}
          eyebrow="Dúvidas"
          title={title}
          description="Se a sua pergunta não estiver aqui, chame no WhatsApp."
        />
        <Accordion items={items} />
      </div>
    </section>
  )
}
