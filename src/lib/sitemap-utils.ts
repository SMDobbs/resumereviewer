import { MetadataRoute } from 'next'

export interface SitemapEntry {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export const sitemapConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://resumereviewer.com',
  defaultChangeFrequency: 'weekly' as const,
  defaultPriority: 0.7,
}

// Static routes with their SEO priorities
export const staticRoutes: SitemapEntry[] = [
  { url: '', priority: 1.0, changeFrequency: 'daily' }, // Homepage
  { url: '/resume-reviewer', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/templates', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/dashboard', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/login', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/signup', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/checkout', priority: 0.7, changeFrequency: 'monthly' },
]

// Tool-specific routes (now just resume reviewer)
export const toolRoutes: SitemapEntry[] = [
  { url: '/resume-reviewer', priority: 0.9, changeFrequency: 'weekly' },
]

// Resource-specific routes (now just templates)
export const resourceRoutes: SitemapEntry[] = [
  { url: '/templates', priority: 0.8, changeFrequency: 'monthly' },
]

/**
 * Generate sitemap entries with full URLs
 */
export function generateSitemapEntries(routes: SitemapEntry[]): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  return routes.map(route => ({
    url: `${sitemapConfig.baseUrl}${route.url}`,
    lastModified: route.lastModified || currentDate,
    changeFrequency: route.changeFrequency || sitemapConfig.defaultChangeFrequency,
    priority: route.priority || sitemapConfig.defaultPriority,
  }))
}

/**
 * Fetch dynamic template routes (if we add individual template pages later)
 */
export async function getDynamicTemplateRoutes(): Promise<SitemapEntry[]> {
  // TODO: Implement when we have individual template pages
  // Example:
  // const templates = await fetchTemplates()
  // return templates.map(template => ({
  //   url: `/templates/${template.slug}`,
  //   lastModified: new Date(template.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))
  
  return []
}

/**
 * Fetch all dynamic routes
 */
export async function getAllDynamicRoutes(): Promise<SitemapEntry[]> {
  const templates = await getDynamicTemplateRoutes()
  
  return [...templates]
} 