const NON_DIGITS = /\D/g

/**
 * Devolve só dígitos, com DDI 55 na frente.
 * Aceita "(49) 99905-2518", "49999052518" ou "5549999052518".
 */
export function normalizePhone(input: string): string {
  const digits = input.replace(NON_DIGITS, '')
  const withCountry = digits.startsWith('55') && digits.length >= 12 ? digits : `55${digits}`
  if (withCountry.length < 12 || withCountry.length > 13) {
    throw new Error(`Número de telefone inválido: ${input}`)
  }
  return withCountry
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const number = normalizePhone(phone)
  const text = message.trim()
  return text ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : `https://wa.me/${number}`
}

export const WA_MESSAGES = {
  tecnico: 'Olá! Vim pelo site da MRJ e preciso de assistência técnica em eletrônica industrial.',
  comercial: 'Olá! Vim pelo site da MRJ e gostaria de falar com o comercial.',
} as const
