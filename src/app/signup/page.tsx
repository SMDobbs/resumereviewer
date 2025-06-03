import { Suspense } from 'react'
import SignUpForm from '../../components/auth/SignUpForm'

function SignUpFormFallback() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFormFallback />}>
      <SignUpForm />
    </Suspense>
  )
} 