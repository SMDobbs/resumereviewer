import { Suspense } from 'react'
import LoginForm from '../../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
    </div>}>
      <LoginForm />
    </Suspense>
  )
} 