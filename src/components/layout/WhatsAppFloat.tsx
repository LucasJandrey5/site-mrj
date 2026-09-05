'use client'

import { useScrolled } from '@/components/motion/useScrolled'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const href = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)

/** Botão fixo de WhatsApp; aparece depois de 300px de scroll (spec seção 6, item 12). */
export function WhatsAppFloat() {
  const visible = useScrolled(300)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o setor técnico no WhatsApp"
      data-testid="whatsapp-float"
      className={`fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-navy-950 shadow-lg shadow-navy-950/20 transition-all duration-300 hover:bg-whatsapp-dark ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
