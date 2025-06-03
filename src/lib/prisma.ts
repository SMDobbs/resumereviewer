import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database connection helper with retry logic
export async function connectWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries) {
        throw error
      }
      
      // Check if it's a connection error that might benefit from retry
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes("Can't reach database server") || 
          errorMessage.includes("Connection terminated") ||
          errorMessage.includes("connection refused")) {
        
        console.log(`Database connection attempt ${attempt} failed, retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff
      } else {
        throw error // Don't retry for other types of errors
      }
    }
  }
  
  throw new Error('All retry attempts exhausted')
} 