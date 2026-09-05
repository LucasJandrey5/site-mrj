import Image from 'next/image'

export function Logo({ variant = 'dark', className = '' }: { variant?: 'dark' | 'light'; className?: string }) {
  return (
    <Image
      src={variant === 'light' ? '/logo-white.svg' : '/logo.svg'}
      alt="MRJ Tecnologia"
      width={220}
      height={48}
      priority
      unoptimized
      className={className}
    />
  )
}
