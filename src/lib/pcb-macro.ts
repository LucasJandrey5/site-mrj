/**
 * Macro de placa de circuito desenhada em SVG. Faz as vezes da foto de bancada
 * que ainda não existe e entra como preenchimento do título do hero: só aparecem
 * as tiras recortadas pelas letras, e por isso a densidade é alta — cada letra
 * precisa mostrar trilha, pad ou componente reconhecível.
 *
 * Quando chegar uma macro fotográfica da bancada, troque a URL no hero; o resto
 * do recorte continua igual.
 */

const W = 1600
const H = 900

const COLORS = {
  base1: '#0e5c3a',
  base2: '#06301f',
  base3: '#02160e',
  copper: '#d8a24a',
  pad: '#e8c887',
} as const

/** Ruído determinístico em [0, 1): o mesmo build sempre gera a mesma placa. */
function noise(i: number): number {
  return Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1)
}

/** Trilhas com cantos a 45 graus, como no roteamento de uma placa de verdade. */
function traces(): string[] {
  const out: string[] = []
  for (let i = 0; i < 26; i++) {
    let x = -40 + ((i * 311) % 300)
    let y = 40 + ((i * 137) % 820)
    let d = `M${x} ${y}`
    const segments = 3 + Math.floor(noise(i) * 4)
    for (let s = 0; s < segments; s++) {
      x += 120 + noise(i * 7 + s) * 260
      d += `L${x.toFixed(0)} ${y.toFixed(0)}`
      const dy = (noise(i * 13 + s) > 0.5 ? 1 : -1) * (40 + noise(i * 3 + s) * 90)
      d += `l${Math.abs(dy).toFixed(0)} ${dy.toFixed(0)}`
      x += Math.abs(dy)
      y += dy
    }
    d += `L${W + 100} ${y.toFixed(0)}`
    out.push(`<path d="${d}" stroke-width="${(2.5 + noise(i * 5) * 4).toFixed(1)}"/>`)
  }
  return out
}

/** Ilhas de solda espalhadas pela placa. */
function pads(): string {
  return Array.from({ length: 34 }, (_, i) => {
    const x = 60 + ((i * 233) % 1500)
    const y = 60 + ((i * 397) % 800)
    return `<circle cx="${x}" cy="${y}" r="9" fill="${COLORS.pad}"/><circle cx="${x}" cy="${y}" r="4" fill="${COLORS.base3}"/>`
  }).join('')
}

/** Circuitos integrados com serigrafia e fileiras de pinos. */
function chips(): string {
  const list: Array<[number, number, number, number, string]> = [
    [180, 300, 300, 190, 'U1'],
    [760, 140, 250, 150, 'U4'],
    [1060, 520, 330, 200, 'IC7'],
  ]
  return list
    .map(([x, y, w, h, label]) => {
      const pins = Array.from(
        { length: Math.floor(w / 26) },
        (_, k) =>
          `<rect x="${x + 14 + k * 26}" y="${y - 12}" width="12" height="14" rx="2" fill="#9aa6b4"/>` +
          `<rect x="${x + 14 + k * 26}" y="${y + h - 2}" width="12" height="14" rx="2" fill="#9aa6b4"/>`,
      ).join('')
      return (
        `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#12161c"/>` +
        `<rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="7" fill="#1b2129"/>` +
        `<circle cx="${x + 26}" cy="${y + 26}" r="7" fill="#0a0d11"/>` +
        `<text x="${x + w / 2}" y="${y + h / 2 + 10}" text-anchor="middle" fill="#5a6472" font-family="monospace" font-size="30" letter-spacing="4">${label}</text>` +
        `${pins}</g>`
      )
    })
    .join('')
}

/** Capacitores eletrolíticos: são eles que dão a escala de macro. */
function capacitors(): string {
  const list: Array<[number, number, number]> = [
    [560, 620, 74],
    [660, 640, 58],
    [1440, 250, 90],
    [1330, 690, 52],
  ]
  return list
    .map(
      ([x, y, r]) =>
        `<g><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${(r * 1.08).toFixed(0)}" fill="#1b2436"/>` +
        `<ellipse cx="${x}" cy="${y}" rx="${(r * 0.82).toFixed(0)}" ry="${(r * 0.9).toFixed(0)}" fill="#232f45"/>` +
        `<path d="M${(x - r * 0.5).toFixed(0)} ${(y - r * 0.55).toFixed(0)}a${(r * 0.5).toFixed(0)} ${(r * 0.5).toFixed(0)} 0 0 1 ${(r * 0.7).toFixed(0)} ${(-r * 0.1).toFixed(0)}" stroke="#8fa8c9" stroke-opacity=".55" stroke-width="6" fill="none"/>` +
        `<path d="M${(x - r * 0.35).toFixed(0)} ${y}h${(r * 0.7).toFixed(0)}" stroke="#6f86a6" stroke-width="5"/></g>`,
    )
    .join('')
}

/** Componentes SMD, os menores da placa: enchem o miolo das letras finas. */
function smd(): string {
  return Array.from({ length: 46 }, (_, i) => {
    const x = 40 + ((i * 179) % 1520)
    const y = 30 + ((i * 293) % 840)
    const w = Math.round(26 + noise(i) * 22)
    return (
      `<rect x="${x}" y="${y}" width="${w}" height="14" rx="3" fill="#0d1117"/>` +
      `<rect x="${x - 5}" y="${y}" width="6" height="14" fill="${COLORS.pad}"/>` +
      `<rect x="${x + w}" y="${y}" width="6" height="14" fill="${COLORS.pad}"/>`
    )
  }).join('')
}

/** SVG completo da placa. `id` prefixa os ids internos para duas placas não colidirem. */
export function pcbMacroSvg(id: string): string {
  const all = traces()
  // As trilhas do fundo saem desfocadas e as da frente nítidas: é o desfoque que
  // faz o desenho parecer fotografia macro em vez de ilustração chapada.
  const far = all.slice(0, 12).join('')
  const near = all.slice(12).join('')

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
    '<defs>' +
    `<linearGradient id="pcb-${id}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${COLORS.base1}"/><stop offset=".55" stop-color="${COLORS.base2}"/><stop offset="1" stop-color="${COLORS.base3}"/>` +
    '</linearGradient>' +
    `<radialGradient id="pcb-luz-${id}" cx=".28" cy=".18" r=".85">` +
    '<stop offset="0" stop-color="#ffffff" stop-opacity=".16"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>' +
    '</radialGradient>' +
    `<radialGradient id="pcb-vinheta-${id}" cx=".5" cy=".5" r=".72">` +
    '<stop offset=".45" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".55"/>' +
    '</radialGradient>' +
    `<filter id="pcb-longe-${id}"><feGaussianBlur stdDeviation="7"/></filter>` +
    `<filter id="pcb-perto-${id}"><feGaussianBlur stdDeviation="3.4"/></filter>` +
    '</defs>' +
    `<rect width="${W}" height="${H}" fill="url(#pcb-${id})"/>` +
    `<g filter="url(#pcb-longe-${id})" opacity=".55">` +
    `<g stroke="${COLORS.copper}" stroke-opacity=".5" fill="none" stroke-linejoin="round">${far}</g>${smd()}</g>` +
    `<g stroke="${COLORS.copper}" stroke-opacity=".78" fill="none" stroke-linejoin="round">${near}</g>` +
    `${pads()}${chips()}` +
    `<g filter="url(#pcb-perto-${id})">${capacitors()}</g>` +
    `<rect width="${W}" height="${H}" fill="url(#pcb-luz-${id})"/>` +
    `<rect width="${W}" height="${H}" fill="url(#pcb-vinheta-${id})"/>` +
    '</svg>'
  )
}

/**
 * A placa embutida como `url()` de CSS. `encodeURIComponent` cuida das aspas e
 * do `#` das cores, que quebrariam o data URI se passassem crus.
 */
export function pcbMacroDataUri(id: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(pcbMacroSvg(id))}")`
}
