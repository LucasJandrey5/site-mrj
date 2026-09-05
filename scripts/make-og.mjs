import sharp from 'sharp'

// Gera public/og.jpg (1200x630) com o logo oficial sobre o azul-marinho da marca.
const W = 1200
const H = 630

const verticals = Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0V${H}"/>`).join('')
const horizontals = Array.from({ length: 14 }, (_, i) => `<path d="M0 ${i * 48}H${W}"/>`).join('')

const fundo = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#06162e"/>
  <g stroke="#ffffff" stroke-opacity="0.05">${verticals}${horizontals}</g>
  <circle cx="960" cy="150" r="300" fill="#0a8fe0" fill-opacity="0.16"/>
</svg>`

const texto = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="80" y="390" font-family="Arial, Helvetica, sans-serif" font-size="38" fill="#cfe4fb">Assistência técnica especializada</text>
  <text x="80" y="444" font-family="Arial, Helvetica, sans-serif" font-size="38" fill="#cfe4fb">em eletrônica industrial</text>
  <text x="80" y="548" font-family="Courier New, monospace" font-size="22" letter-spacing="4" fill="#4fb8f7">CHAPECÓ, SC. ATENDIMENTO EM TODO O BRASIL</text>
</svg>`

const logo = await sharp('public/logo-white.png').resize({ width: 430 }).toBuffer()
const { height: alturaLogo } = await sharp(logo).metadata()

await sharp(Buffer.from(fundo))
  .composite([
    { input: logo, left: 80, top: Math.round(300 - alturaLogo) },
    { input: Buffer.from(texto), left: 0, top: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og.jpg')

console.log('public/og.jpg gerado (1200x630) com o logo oficial')
