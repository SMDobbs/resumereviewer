'use client'

import { useUser } from '@/lib/context/UserContext'
import { UserIcon, CalendarDaysIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { user, loading, logout } = useUser()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to access the dashboard.</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{user.firstName}</span>!
              </h1>
              <p className="text-xl text-gray-400">
                Your analytics career journey continues here
              </p>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 border border-red-400 text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Profile Info */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center mb-4">
              <UserIcon className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">Profile Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <p className="text-white font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white font-medium">{user.email}</p>
              </div>
              {user.currentRole && (
                <div>
                  <label className="text-sm text-gray-400">Current Role</label>
                  <p className="text-white font-medium">{user.currentRole}</p>
                </div>
              )}
              {user.experience !== null && (
                <div>
                  <label className="text-sm text-gray-400">Experience</label>
                  <p className="text-white font-medium">{user.experience} years</p>
                </div>
              )}
              {user.industry && (
                <div>
                  <label className="text-sm text-gray-400">Industry</label>
                  <p className="text-white font-medium">{user.industry}</p>
                </div>
              )}
            </div>
          </div>

          {/* Account Status */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">Account Status</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Role</label>
                <p className="text-white font-medium capitalize">{user.role.toLowerCase()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Subscription</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.subscriptionStatus === 'TRIAL' 
                    ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-400/20'
                    : user.subscriptionStatus === 'ACTIVE'
                    ? 'bg-green-900/20 text-green-400 border border-green-400/20'
                    : 'bg-red-900/20 text-red-400 border border-red-400/20'
                }`}>
                  {user.subscriptionStatus}
                </span>
              </div>
              <div>
                <label className="text-sm text-gray-400">Member Since</label>
                <p className="text-white font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Goals & Progress */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center mb-4">
              <CalendarDaysIcon className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">Your Goals</h3>
            </div>
            {user.goals ? (
              <p className="text-gray-300">{user.goals}</p>
            ) : (
              <div>
                <p className="text-gray-400 mb-4">Set your career goals to get personalized recommendations.</p>
                <button className="btn-primary text-sm">
                  Set Goals
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-green-400/20 rounded-lg hover:bg-green-400/10 transition-colors text-left">
              <h4 className="font-semibold text-green-400 mb-2">Take Skill Assessment</h4>
              <p className="text-sm text-gray-400">Evaluate your current analytics skills</p>
            </button>
            <button className="p-4 border border-green-400/20 rounded-lg hover:bg-green-400/10 transition-colors text-left">
              <h4 className="font-semibold text-green-400 mb-2">Review Tools</h4>
              <p className="text-sm text-gray-400">Explore our premium analytics tools</p>
            </button>
            <button className="p-4 border border-green-400/20 rounded-lg hover:bg-green-400/10 transition-colors text-left">
              <h4 className="font-semibold text-green-400 mb-2">Update Profile</h4>
              <p className="text-sm text-gray-400">Complete your profile information</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 