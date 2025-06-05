import React from 'react'
import Link from 'next/link'

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

  const iconSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  const iconComponent = (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-400/25 transition-all duration-300 relative overflow-hidden`}>
      {/* Material Icons insert_chart */}
      <span className={`material-symbols-outlined text-white ${iconSizeClasses[size]} leading-none`}>
        insert_chart
      </span>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
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
              Dobbs Analytics Coaching
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
            Dobbs Analytics Coaching
          </span>
        </div>
      )}
    </Link>
  )
} 