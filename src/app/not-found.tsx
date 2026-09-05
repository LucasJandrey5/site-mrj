import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-start justify-center pt-28 pb-16">
      <p className="eyebrow text-brand-600">Erro 404</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">
        O endereço pode ter mudado. Volte para a página inicial ou veja os serviços.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Página inicial</Button>
        <Button href="/#servicos" variant="outline">
          Ver serviços
        </Button>
      </div>
    </section>
  )
}
