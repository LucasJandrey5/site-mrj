'use client'

import { Menu, MessageCircle, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useScrolled } from '@/components/motion/useScrolled'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const links = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#marcas', label: 'Marcas' },
  { href: '/#processo', label: 'Processo' },
  { href: '/#laboratorio', label: 'Laboratório' },
  { href: '/#contato', label: 'Contato' },
]

const whatsapp = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)

export function Nav() {
  const pathname = usePathname()
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  // Trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Na home a barra nasce transparente sobre o hero escuro; nas outras páginas já nasce sólida.
  const solid = scrolled || open || pathname !== '/'
  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-white/10 bg-navy-950/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" aria-label="MRJ Tecnologia, página inicial" className="shrink-0" onClick={close}>
          <Logo variant="light" size="nav" priority />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-white/75 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={whatsapp} external variant="whatsapp" testId="nav-whatsapp">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="flex h-[calc(100svh-4rem)] flex-col gap-2 border-t border-white/10 bg-navy-950 px-5 pt-4 pb-8 md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="rounded-xl px-3 py-3 text-lg font-medium text-white/85 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-auto">
            <Button href={whatsapp} external variant="whatsapp" size="lg" className="w-full" onClick={close}>
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
