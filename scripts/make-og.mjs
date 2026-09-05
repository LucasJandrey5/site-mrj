import sharp from 'sharp'

// Gera public/og.jpg (1200x630) com a marca oficial sobre o azul-marinho.
const W = 1200
const H = 630

const verticais = Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0V${H}"/>`).join('')
const horizontais = Array.from({ length: 14 }, (_, i) => `<path d="M0 ${i * 48}H${W}"/>`).join('')

const fundo = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#06162e"/>
  <g stroke="#ffffff" stroke-opacity="0.05">${verticais}${horizontais}</g>
  <circle cx="980" cy="140" r="300" fill="#0a8fe0" fill-opacity="0.16"/>
</svg>`

const texto = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="82" y="292" font-family="Arial, Helvetica, sans-serif" font-size="28" letter-spacing="11" fill="#ffffff">TECNOLOGIA</text>
  <text x="80" y="400" font-family="Arial, Helvetica, sans-serif" font-size="38" fill="#cfe4fb">Assistência técnica especializada</text>
  <text x="80" y="452" font-family="Arial, Helvetica, sans-serif" font-size="38" fill="#cfe4fb">em eletrônica industrial</text>
  <text x="80" y="552" font-family="Courier New, monospace" font-size="22" letter-spacing="4" fill="#4fb8f7">CHAPECÓ, SC. ATENDIMENTO EM TODO O BRASIL</text>
</svg>`

const marca = await sharp('public/logo.png').resize({ width: 330 }).toBuffer()

await sharp(Buffer.from(fundo))
  .composite([
    { input: marca, left: 80, top: 100 },
    { input: Buffer.from(texto), left: 0, top: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og.jpg')

console.log('public/og.jpg gerado (1200x630) com a marca oficial')
