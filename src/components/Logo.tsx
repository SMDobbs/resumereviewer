import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  variant?: 'navbar' | 'favicon' | 'footer'
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ variant = 'navbar', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9', 
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  const iconComponent = (
    <div className={`${sizeClasses[size]} relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-green-400/25 transition-all duration-300`}>
      <Image
        src="/document.svg"
        alt="Analytics Resume Review Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )

  if (variant === 'favicon') {
    return iconComponent
  }

  if (variant === 'footer') {
    return (
      <div className="flex items-center space-x-3">
        {iconComponent}
        {showText && (
          <div>
            <div className={`font-bold gradient-text ${textSizeClasses[size]}`}>
              Analytics Resume Review
            </div>
          </div>
        )}
      </div>
    )
  }

  // Default navbar variant
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      {iconComponent}
      {showText && (
        <div className="flex items-center space-x-2">
          <span className={`font-bold gradient-text ${textSizeClasses[size]}`}>
            Analytics Resume Review
          </span>
        </div>
      )}
    </Link>
  )
} 