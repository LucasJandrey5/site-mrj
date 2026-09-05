import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/data/types'

/** Acordeão com <details>/<summary>: acessível por teclado sem JavaScript. */
export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 leading-relaxed text-ink-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
