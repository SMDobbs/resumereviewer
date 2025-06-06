import { MetadataRoute } from 'next'
import { 
  staticRoutes, 
  toolRoutes, 
  resourceRoutes, 
  generateSitemapEntries,
  getAllDynamicRoutes 
} from '@/lib/sitemap-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all static routes
  const staticEntries = generateSitemapEntries([
    ...staticRoutes,
    ...toolRoutes,
    ...resourceRoutes,
  ])

  // Get dynamic routes (articles, guides, etc.)
  const dynamicRoutes = await getAllDynamicRoutes()
  const dynamicEntries = generateSitemapEntries(dynamicRoutes)

  // Combine all entries
  return [
    ...staticEntries,
    ...dynamicEntries,
  ]
} 