import type { MetadataRoute } from 'next'
import { company } from '@/data/company'
import { services } from '@/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: company.siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...services.map((s) => ({
      url: `${company.siteUrl}/servicos/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
