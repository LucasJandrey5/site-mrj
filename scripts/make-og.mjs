import sharp from 'sharp'

// Gera public/og.jpg (1200x630) a partir de um SVG, sem depender de navegador.
const verticals = Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0V630"/>`).join('')
const horizontals = Array.from({ length: 14 }, (_, i) => `<path d="M0 ${i * 48}H1200"/>`).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#06162e"/>
  <g stroke="#ffffff" stroke-opacity="0.05">${verticals}${horizontals}</g>
  <circle cx="920" cy="180" r="280" fill="#2a6fd6" fill-opacity="0.18"/>
  <text x="80" y="290" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="#ffffff">MRJ Tecnologia</text>
  <text x="80" y="360" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#c7d2fe">Assistência técnica especializada</text>
  <text x="80" y="408" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#c7d2fe">em eletrônica industrial</text>
  <text x="80" y="540" font-family="Courier New, monospace" font-size="22" letter-spacing="4" fill="#5b93e6">CHAPECÓ, SC. ATENDIMENTO EM TODO O BRASIL</text>
</svg>`

await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile('public/og.jpg')
console.log('public/og.jpg gerado (1200x630)')
