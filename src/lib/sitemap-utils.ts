import { MetadataRoute } from 'next'

export interface SitemapEntry {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export const sitemapConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://analysthub.com',
  defaultChangeFrequency: 'weekly' as const,
  defaultPriority: 0.7,
}

// Static routes with their SEO priorities
export const staticRoutes: SitemapEntry[] = [
  { url: '', priority: 1.0, changeFrequency: 'daily' }, // Homepage
  { url: '/login', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/signup', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/dashboard', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/tools', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/coaching', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/articles', priority: 0.8, changeFrequency: 'daily' },
  { url: '/guides', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/resources', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/learning', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industry', priority: 0.7, changeFrequency: 'weekly' },
]

// Tool-specific routes
export const toolRoutes: SitemapEntry[] = [
  { url: '/tools/resume-reviewer', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/tools/mock-interview', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/tools/linkedin-optimizer', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/tools/skill-assessment', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/tools/data-export', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/resume-reviewer', priority: 0.8, changeFrequency: 'weekly' },
]

// Resource-specific routes
export const resourceRoutes: SitemapEntry[] = [
  { url: '/resources/resume-templates', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/resources/blog-templates', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/guides/sql-basics', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/articles/interview-tips', priority: 0.7, changeFrequency: 'monthly' },
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
 * Fetch dynamic article routes (implement this when you have a CMS or database)
 */
export async function getDynamicArticleRoutes(): Promise<SitemapEntry[]> {
  // TODO: Implement when you have dynamic articles
  // Example:
  // const articles = await fetchArticles()
  // return articles.map(article => ({
  //   url: `/articles/${article.slug}`,
  //   lastModified: new Date(article.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))
  
  return []
}

/**
 * Fetch dynamic guide routes (implement this when you have dynamic guides)
 */
export async function getDynamicGuideRoutes(): Promise<SitemapEntry[]> {
  // TODO: Implement when you have dynamic guides
  return []
}

/**
 * Fetch all dynamic routes
 */
export async function getAllDynamicRoutes(): Promise<SitemapEntry[]> {
  const [articles, guides] = await Promise.all([
    getDynamicArticleRoutes(),
    getDynamicGuideRoutes(),
  ])
  
  return [...articles, ...guides]
} 