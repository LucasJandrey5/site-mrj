import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('usa details/summary nativos, um por item', () => {
    const html = renderToStaticMarkup(
      <Accordion
        items={[
          { question: 'Pergunta 1?', answer: 'Resposta 1.' },
          { question: 'Pergunta 2?', answer: 'Resposta 2.' },
        ]}
      />,
    )
    expect(html.match(/<details/g)).toHaveLength(2)
    expect(html.match(/<summary/g)).toHaveLength(2)
    expect(html).toContain('Pergunta 2?')
    expect(html).toContain('Resposta 2.')
  })
})
