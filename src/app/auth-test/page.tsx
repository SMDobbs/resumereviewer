'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/lib/context/UserContext'
import { clearAuthenticationData, detectSessionIssues } from '@/lib/utils/session-utils'

export default function AuthTestPage() {
  const { user, loading, refreshUser } = useUser()
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null)
  const [sessionIssues, setSessionIssues] = useState<{ hasStaleSession: boolean; hasMultipleCookies: boolean; issues: string[] } | null>(null)
  const [testLoading, setTestLoading] = useState(false)

  useEffect(() => {
    // Check for session issues on load
    const issues = detectSessionIssues()
    setSessionIssues(issues)
  }, [])

  const fetchDebugInfo = async () => {
    setTestLoading(true)
    try {
      const response = await fetch('/api/auth/debug')
      const data = await response.json()
      setDebugInfo(data.debug)
    } catch (error) {
      console.error('Failed to fetch debug info:', error)
      setDebugInfo({ error: 'Failed to fetch debug info' })
    } finally {
      setTestLoading(false)
    }
  }

  const handleClearAuth = async () => {
    setTestLoading(true)
    try {
      const success = await clearAuthenticationData()
      if (success) {
        await refreshUser()
        await fetchDebugInfo()
        const newIssues = detectSessionIssues()
        setSessionIssues(newIssues)
      }
    } catch (error) {
      console.error('Failed to clear auth data:', error)
    } finally {
      setTestLoading(false)
    }
  }

  const handleRefreshUser = async () => {
    setTestLoading(true)
    try {
      await refreshUser()
      await fetchDebugInfo()
    } catch (error) {
      console.error('Failed to refresh user:', error)
    } finally {
      setTestLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Authentication Test Page</h1>
          <p className="text-gray-400">This page helps debug authentication issues.</p>
        </div>

        {/* User Context Status */}
        <div className="glass rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Context Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Loading:</span>
              <span className={loading ? 'text-yellow-400' : 'text-green-400'}>
                {loading ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>User Found:</span>
              <span className={user ? 'text-green-400' : 'text-red-400'}>
                {user ? 'Yes' : 'No'}
              </span>
            </div>
            {user && (
              <>
                <div className="flex justify-between">
                  <span>User ID:</span>
                  <span className="text-gray-300">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="text-gray-300">{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subscription:</span>
                  <span className="text-gray-300">{user.subscriptionStatus}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Session Issues */}
        {sessionIssues && (
          <div className="glass rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Session Issues Detection</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Has Stale Session:</span>
                <span className={sessionIssues.hasStaleSession ? 'text-yellow-400' : 'text-green-400'}>
                  {sessionIssues.hasStaleSession ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Multiple Cookies:</span>
                <span className={sessionIssues.hasMultipleCookies ? 'text-yellow-400' : 'text-green-400'}>
                  {sessionIssues.hasMultipleCookies ? 'Yes' : 'No'}
                </span>
              </div>
              {sessionIssues.issues.length > 0 && (
                <div>
                  <span>Issues Found:</span>
                  <ul className="list-disc list-inside text-yellow-400 mt-2">
                    {sessionIssues.issues.map((issue: string, index: number) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="glass rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={fetchDebugInfo}
              disabled={testLoading}
              className="px-4 py-2 bg-blue-400/20 text-blue-400 rounded-lg hover:bg-blue-400/30 transition-colors disabled:opacity-50"
            >
              Fetch Debug Info
            </button>
            <button
              onClick={handleRefreshUser}
              disabled={testLoading}
              className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors disabled:opacity-50"
            >
              Refresh User
            </button>
            <button
              onClick={handleClearAuth}
              disabled={testLoading}
              className="px-4 py-2 bg-red-400/20 text-red-400 rounded-lg hover:bg-red-400/30 transition-colors disabled:opacity-50"
            >
              Clear All Auth Data
            </button>
          </div>
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Server Debug Info</h2>
            <pre className="text-sm text-gray-300 overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="glass rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">How to Use This Page</h2>
          <div className="text-gray-300 space-y-2">
            <p>1. Check the User Context Status to see if you're logged in</p>
            <p>2. Click "Fetch Debug Info" to see server-side authentication status</p>
            <p>3. If you see issues, try "Clear All Auth Data" to reset everything</p>
            <p>4. Use "Refresh User" to reload user data from the server</p>
            <p className="text-yellow-400 mt-4">
              If you're seeing "Access Denied" errors, this page will help identify the cause.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 