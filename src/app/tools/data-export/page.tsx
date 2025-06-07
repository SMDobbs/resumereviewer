'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  CloudArrowDownIcon, 
  CodeBracketIcon,
  TableCellsIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  HeartIcon,
  MusicalNoteIcon,
  HomeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

interface Dataset {
  id: string
  name: string
  description: string
  category: string
  rows: number
  columns: number
  size: string
  icon: React.ComponentType<{ className?: string }>
  preview: string[]
  tags: string[]
  tableName?: string
  relatedTables?: string[]
  type?: 'datamart' | 'table'
  tableCount?: number
}

interface ApiKey {
  id: string
  keyPreview: string
  isActive: boolean
  createdAt: string
  lastUsed?: string
  name?: string
}

// Icon mapping for different categories
const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'e-commerce & retail':
    case 'sales & marketing':
      return CurrencyDollarIcon
    case 'education & learning':
      return AcademicCapIcon
    case 'health & fitness':
      return HeartIcon
    case 'entertainment & media':
      return MusicalNoteIcon
    case 'iot & smart devices':
      return HomeIcon
    case 'healthcare':
      return HeartIcon
    case 'cybersecurity':
      return TableCellsIcon
    case 'customer analytics':
      return UserGroupIcon
    default:
      return ChartBarIcon
  }
}

const apiEndpoints = [
  {
    method: 'GET',
    endpoint: '/api/datasets',
    description: 'List all available datasets (datamarts and tables) with metadata',
    example: 'curl -H "Authorization: Bearer your_api_key" "https://analysthub.com/api/datasets"',
    authRequired: true
  },
  {
    method: 'GET',
    endpoint: '/api/datasets/{id}',
    description: 'Get detailed metadata for a specific dataset including all related tables',
    example: 'curl -H "Authorization: Bearer your_api_key" "https://analysthub.com/api/datasets/ecom-datamart"',
    authRequired: true
  },
  {
    method: 'GET',
    endpoint: '/api/datasets/{id}/download',
    description: 'Download dataset. For datamarts: use ?format=xlsx for Excel with all tables as sheets. API key provides higher rate limits.',
    example: 'curl -H "Authorization: Bearer your_api_key" "https://analysthub.com/api/datasets/ecom-datamart/download?format=xlsx"',
    authRequired: false,
    note: 'API key optional but recommended for higher rate limits'
  },
  {
    method: 'POST',
    endpoint: '/api/datasets/{id}/query',
    description: 'Query dataset with filters, sorting, and table selection. Requires API key.',
    example: 'curl -X POST -H "Authorization: Bearer your_api_key" -H "Content-Type: application/json" -d \'{"table": "ecom_orders", "filters": {"total_amount": 100}, "limit": 500}\' "https://analysthub.com/api/datasets/ecom-datamart/query"',
    authRequired: true
  }
]

export default function DataExportPage() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'api'>('datasets')
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showApiModal, setShowApiModal] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null)
  
  // API Key Management
  const [userApiKeys, setUserApiKeys] = useState<ApiKey[]>([])
  const [loadingApiKeys, setLoadingApiKeys] = useState(true)
  const [generatingKey, setGeneratingKey] = useState(false)
  const [downloadingDataset, setDownloadingDataset] = useState<string | null>(null)
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)
  const [actionFeedback, setActionFeedback] = useState<string | null>(null)

  // Fetch user's API keys from server
  const fetchApiKeys = async () => {
    try {
      setLoadingApiKeys(true)
      const response = await fetch('/api/api-keys', {
        credentials: 'include'
      })
      const data = await response.json()
      
      if (data.success) {
        setUserApiKeys(data.apiKeys || [])
      } else {
        setUserApiKeys([])
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
      setUserApiKeys([])
    } finally {
      setLoadingApiKeys(false)
    }
  }

  // Fetch datasets from API
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        setLoading(true)
        
        // Fetch datasets - no API key needed for viewing
        const response = await fetch('/api/datasets')
        const data = await response.json()
        
        if (data.success) {
          // Add icons to datasets
          const datasetsWithIcons = data.datasets.map((dataset: Dataset) => ({
            ...dataset,
            icon: getIconForCategory(dataset.category)
          }))
          setDatasets(datasetsWithIcons)
        } else {
          setError(data.error || 'Failed to fetch datasets')
        }
      } catch (err) {
        setError('Unable to load datasets. Please try again later.')
        console.error('Error fetching datasets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDatasets()
    fetchApiKeys()
  }, [])

  const handleDownload = async (dataset: Dataset, format: 'csv' | 'json' | 'xlsx') => {
    if (downloadingDataset) {
      alert('Please wait for the current download to complete.')
      return
    }

    try {
      setDownloadingDataset(dataset.id)
      
      // Use API key if available for better rate limits
      const headers: HeadersInit = {}
      if (userApiKeys.length > 0) {
        const activeKey = userApiKeys.find(key => key.isActive)
        if (activeKey && activeKey.keyPreview) {
          // Get full key from localStorage if available
          const storedKey = localStorage.getItem('analysthub_api_key')
          if (storedKey && storedKey.startsWith(activeKey.keyPreview.replace('...', ''))) {
            headers['Authorization'] = `Bearer ${storedKey}`
          }
        }
      }
      
      const url = `/api/datasets/${dataset.id}/download?format=${format}`
      const response = await fetch(url, { headers })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after')
          const waitTime = retryAfter ? `${retryAfter} seconds` : 'a few minutes'
          alert(`Rate limit exceeded. ${errorData.error || 'Please wait'} ${waitTime} before downloading again.\n\n${errorData.suggestion || 'Consider generating an API key for higher rate limits.'}`)
          return
        }
        
        throw new Error(errorData.error || 'Download failed')
      }
      
      // Handle different file formats
      if (format === 'csv' || format === 'json') {
        if (format === 'csv') {
          const csvData = await response.text()
          const blob = new Blob([csvData], { type: 'text/csv' })
          const downloadUrl = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = downloadUrl
          a.download = `${dataset.id}.csv`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(downloadUrl)
          document.body.removeChild(a)
        } else {
          const jsonData = await response.json()
          const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
          const downloadUrl = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = downloadUrl
          a.download = `${dataset.id}.json`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(downloadUrl)
          document.body.removeChild(a)
        }
      } else if (format === 'xlsx') {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `${dataset.id}-datamart.xlsx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(a)
      }
      
      // Show remaining download count if available
      const remaining = response.headers.get('x-ratelimit-remaining')
      if (remaining) {
        console.log(`Downloads remaining: ${remaining}`)
      }
      
    } catch (error) {
      console.error('Download failed:', error)
      alert(`Download failed: ${(error as Error).message}`)
    } finally {
      setDownloadingDataset(null)
    }
  }

  const handleApiConnect = (dataset: Dataset) => {
    setSelectedDataset(dataset)
    setShowApiModal(true)
  }

  const generateApiKey = async () => {
    if (generatingKey) return
    
    try {
      setGeneratingKey(true)
      setActionFeedback(null)
      
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: `API Key ${new Date().toLocaleDateString()}`
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 401) {
          setActionFeedback('Please log in to generate an API key.')
          return
        }
        if (response.status === 429) {
          const retryAfter = data.retryAfter ? `${data.retryAfter} seconds` : 'a few minutes'
          setActionFeedback(`Rate limit exceeded. Please wait ${retryAfter} before generating another API key.`)
          return
        }
        throw new Error(data.error || 'Failed to generate API key')
      }
      
      if (data.success) {
        const newApiKey = data.apiKey.key
        
        // Store in localStorage for API calls
        localStorage.setItem('analysthub_api_key', newApiKey)
        
        // Copy to clipboard
        navigator.clipboard.writeText(newApiKey)
        
        // Refresh API keys list
        await fetchApiKeys()
        
        setActionFeedback('API key generated successfully! Key copied to clipboard and saved.')
        
        // Clear feedback after 5 seconds
        setTimeout(() => setActionFeedback(null), 5000)
      }
      
    } catch (error) {
      console.error('Error generating API key:', error)
      setActionFeedback(`Failed to generate API key: ${(error as Error).message}`)
      setTimeout(() => setActionFeedback(null), 5000)
    } finally {
      setGeneratingKey(false)
    }
  }

  const deleteApiKey = async (keyId: string) => {
    try {
      const response = await fetch(`/api/api-keys/${keyId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Remove from localStorage if it matches
        const storedKey = localStorage.getItem('analysthub_api_key')
        if (storedKey) {
          const keyToDelete = userApiKeys.find(k => k.id === keyId)
          if (keyToDelete && storedKey.startsWith(keyToDelete.keyPreview.replace('...', ''))) {
            localStorage.removeItem('analysthub_api_key')
          }
        }
        
        // Refresh the list
        await fetchApiKeys()
        setActionFeedback('API key deleted successfully.')
        setTimeout(() => setActionFeedback(null), 3000)
      } else {
        throw new Error(data.error || 'Failed to delete API key')
      }
    } catch (error) {
      console.error('Error deleting API key:', error)
      setActionFeedback(`Failed to delete API key: ${(error as Error).message}`)
      setTimeout(() => setActionFeedback(null), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tools" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Data Export & <span className="gradient-text">API Access</span>
          </h1>
          <p className="text-xl text-gray-400">
            Perfect datasets for building impressive portfolio projects. Show employers your ability to consume APIs and create stunning dashboards with real-world data.
          </p>
        </div>

        {/* API Key Management - Minimal Section */}
        <div className="glass rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <CodeBracketIcon className="h-5 w-5 text-green-400" />
              <h2 className="text-lg font-semibold text-white">API Access</h2>
              <span className="text-xs text-gray-500">25/hour</span>
            </div>
          </div>
          
          {loadingApiKeys ? (
            <div className="flex items-center py-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-400 border-t-transparent mr-2"></div>
              <span className="text-sm text-gray-400">Loading...</span>
            </div>
          ) : userApiKeys.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <div className="flex items-center space-x-2 flex-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <div className="font-mono text-sm text-gray-300 flex-1">
                    {userApiKeys[0].keyPreview}<span className="text-gray-600">••••••••••••••••••••••••••••••••••••••••</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => {
                      const storedKey = localStorage.getItem('analysthub_api_key')
                      if (storedKey) {
                        navigator.clipboard.writeText(storedKey)
                        setCopyFeedback('Copied!')
                        setTimeout(() => setCopyFeedback(null), 2000)
                      } else {
                        setCopyFeedback('Not found')
                        setTimeout(() => setCopyFeedback(null), 2000)
                      }
                    }}
                    className="px-2 py-1 text-xs bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded transition-colors"
                  >
                    {copyFeedback || 'Copy'}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete API key?')) {
                        deleteApiKey(userApiKeys[0].id)
                      }
                    }}
                    className="px-2 py-1 text-xs bg-red-400/10 hover:bg-red-400/20 text-red-400 rounded transition-colors"
                  >
                    Del
                  </button>
                </div>
              </div>
              
              {actionFeedback && (
                <div className="p-2 bg-green-400/10 border border-green-400/20 rounded text-xs text-green-400">
                  {actionFeedback}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Generate an API key to access datasets programmatically
              </p>
              
              <div className="flex items-center space-x-3">
                {actionFeedback && (
                  <span className="text-xs text-green-400">{actionFeedback}</span>
                )}
                <button
                  onClick={generateApiKey}
                  disabled={generatingKey}
                  className="px-3 py-1.5 text-sm bg-green-400 text-gray-900 rounded hover:bg-green-300 transition-colors font-medium disabled:opacity-50"
                >
                  {generatingKey ? 'Generating...' : 'Generate Key'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('datasets')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'datasets'
                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <TableCellsIcon className="h-5 w-5 inline mr-2" />
            Datasets
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'api'
                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <CodeBracketIcon className="h-5 w-5 inline mr-2" />
            API Documentation
          </button>
        </div>

        {activeTab === 'datasets' && (
          <div>
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading datasets...</p>
              </div>
            )}

            {error && (
              <div className="glass rounded-xl p-6 mb-8 border border-red-500/20">
                <h3 className="text-red-400 font-semibold mb-2">Unable to Load Data</h3>
                <p className="text-gray-400 mb-4">{error}</p>
                <p className="text-sm text-gray-500">
                  This might be a temporary issue. Please try refreshing the page. 
                  If the problem persists, the datasets may be temporarily unavailable.
                </p>
              </div>
            )}

            {!loading && !error && datasets.length === 0 && (
              <div className="glass rounded-xl p-6 mb-8">
                <h3 className="text-yellow-400 font-semibold mb-2">No Datasets Found</h3>
                <p className="text-gray-400">
                  No datasets are currently available. Please check your database connection and table configuration.
                </p>
              </div>
            )}

            {/* Datasets Grid */}
            {!loading && !error && datasets.length > 0 && (
              <div className="space-y-8">
                {/* Datamarts Section */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    <h2 className="text-2xl font-bold text-green-400">Business Intelligence Datamarts</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {datasets
                      .filter(dataset => dataset.type === 'datamart')
                      .map((dataset) => {
                        const Icon = dataset.icon
                        return (
                          <div key={dataset.id} className="group relative h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-300/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                            <div className="relative glass rounded-xl p-6 border border-gray-700/50 group-hover:border-green-400/30 transition-all duration-300 h-full flex flex-col">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                  <div className="w-14 h-14 bg-gradient-to-br from-green-400/20 to-green-300/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="h-7 w-7 text-green-400" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold mb-2">{dataset.name}</h3>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full">
                                        {dataset.category}
                                      </span>
                                      <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full font-medium">
                                        {dataset.tableCount} tables
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Content that can grow */}
                              <div className="flex-1 space-y-4">
                                {/* Description */}
                                <p className="text-gray-400 leading-relaxed">{dataset.description}</p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                                    <div className="text-lg font-bold text-green-400">{dataset.rows.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Total Rows</div>
                                  </div>
                                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                                    <div className="text-lg font-bold text-green-400">{dataset.columns}</div>
                                    <div className="text-xs text-gray-500">Total Columns</div>
                                  </div>
                                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                                    <div className="text-lg font-bold text-green-400">{dataset.size}</div>
                                    <div className="text-xs text-gray-500">Estimated Size</div>
                                  </div>
                                </div>

                                {/* Tags */}
                                <div>
                                  <div className="flex flex-wrap gap-2">
                                    {dataset.tags.slice(0, 4).map((tag, index) => (
                                      <span key={index} className="text-xs bg-green-400/10 text-green-400 px-2 py-1 rounded-full border border-green-400/20">
                                        {tag}
                                      </span>
                                    ))}
                                    {dataset.tags.length > 4 && (
                                      <span className="text-xs text-gray-500 px-2 py-1">
                                        +{dataset.tags.length - 4} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons - Fixed at bottom */}
                              <div className="flex gap-3 mt-6">
                                <button
                                  onClick={() => handleDownload(dataset, 'xlsx')}
                                  disabled={downloadingDataset === dataset.id}
                                  className="flex-1 px-4 py-3 bg-green-400 text-gray-900 rounded-lg hover:bg-green-300 transition-all duration-300 text-sm font-medium flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {downloadingDataset === dataset.id ? (
                                    <>
                                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-gray-900 border-t-transparent rounded-full"></div>
                                      Downloading...
                                    </>
                                  ) : (
                                    <>
                                      <CloudArrowDownIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                      Download Excel
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleApiConnect(dataset)}
                                  className="flex-1 px-4 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 hover:border-green-300 transition-all duration-300 text-sm font-medium flex items-center justify-center group"
                                >
                                  <CodeBracketIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                  API Info
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>

                {/* Standalone Tables Section */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    <h2 className="text-2xl font-bold text-green-400">Specialized Analytics Tables</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {datasets
                      .filter(dataset => dataset.type === 'table')
                      .map((dataset) => {
                        const Icon = dataset.icon
                        return (
                          <div key={dataset.id} className="group relative h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-300/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                            <div className="relative glass rounded-xl p-6 border border-gray-700/50 group-hover:border-green-400/30 transition-all duration-300 h-full flex flex-col">
                              {/* Header */}
                              <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-300/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                  <Icon className="h-6 w-6 text-green-400" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold mb-1">{dataset.name}</h3>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded-full">
                                      {dataset.category}
                                    </span>
                                    <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">
                                      Single Table
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Content that can grow */}
                              <div className="flex-1 space-y-4">
                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed">{dataset.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3">
                                  <div className="text-center p-2 bg-gray-800/50 rounded">
                                    <div className="text-sm font-bold text-green-400">{dataset.rows.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Rows</div>
                                  </div>
                                  <div className="text-center p-2 bg-gray-800/50 rounded">
                                    <div className="text-sm font-bold text-green-400">{dataset.columns}</div>
                                    <div className="text-xs text-gray-500">Columns</div>
                                  </div>
                                  <div className="text-center p-2 bg-gray-800/50 rounded">
                                    <div className="text-sm font-bold text-green-400">{dataset.size}</div>
                                    <div className="text-xs text-gray-500">Size</div>
                                  </div>
                                </div>

                                {/* Tags */}
                                <div>
                                  <div className="flex flex-wrap gap-1">
                                    {dataset.tags.slice(0, 3).map((tag, index) => (
                                      <span key={index} className="text-xs bg-green-400/10 text-green-400 px-2 py-1 rounded-full border border-green-400/20">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons - Fixed at bottom */}
                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={() => handleDownload(dataset, 'csv')}
                                  disabled={downloadingDataset === dataset.id}
                                  className="flex-1 px-3 py-2 bg-green-400 text-gray-900 rounded-lg hover:bg-green-300 transition-all duration-300 text-sm font-medium flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {downloadingDataset === dataset.id ? (
                                    <>
                                      <div className="animate-spin h-4 w-4 mr-1 border-2 border-gray-900 border-t-transparent rounded-full"></div>
                                      Downloading...
                                    </>
                                  ) : (
                                    <>
                                      <CloudArrowDownIcon className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
                                      CSV
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleApiConnect(dataset)}
                                  className="flex-1 px-3 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 hover:border-green-300 transition-all duration-300 text-sm font-medium flex items-center justify-center group"
                                >
                                  <CodeBracketIcon className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
                                  API
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Start Guide */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Build Your Portfolio Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-400 font-bold">1</span>
                  </div>
                  <h4 className="font-medium mb-2">Choose Your Data</h4>
                  <p className="text-sm text-gray-400">Select from business-ready datasets that showcase real analytics scenarios</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-400 font-bold">2</span>
                  </div>
                  <h4 className="font-medium mb-2">Download or Connect</h4>
                  <p className="text-sm text-gray-400">Download files for dashboards or connect via API to show technical skills</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-400 font-bold">3</span>
                  </div>
                  <h4 className="font-medium mb-2">Showcase Your Skills</h4>
                  <p className="text-sm text-gray-400">Create impressive portfolio projects that demonstrate your analytics abilities</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                <h4 className="font-medium text-green-400 mb-2">💡 Portfolio Project Ideas</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Build interactive dashboards in Tableau, Power BI, or Python</li>
                  <li>• Create API-powered web apps with real-time data updates</li>
                  <li>• Develop predictive models and showcase your findings</li>
                  <li>• Design executive-level reports with actionable insights</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-8">
            {/* API Key Generation */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">API Authentication</h3>
              
              {userApiKeys.length > 0 ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-2">✅ API Key Active</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Your API key is ready to use. Rate limit: 25 requests per hour.
                    </p>
                    <div className="bg-gray-900 p-3 rounded font-mono text-sm break-all">
                      {userApiKeys[0].keyPreview}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const storedKey = localStorage.getItem('analysthub_api_key')
                        if (storedKey) {
                          navigator.clipboard.writeText(storedKey)
                          setCopyFeedback('Copied!')
                          setTimeout(() => setCopyFeedback(null), 2000)
                        } else {
                          setCopyFeedback('Key not found')
                          setTimeout(() => setCopyFeedback(null), 2000)
                        }
                      }}
                      className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors text-sm"
                    >
                      {copyFeedback || 'Copy Full Key'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete API key?')) {
                          deleteApiKey(userApiKeys[0].id)
                        }
                      }}
                      className="px-4 py-2 border border-red-400 text-red-400 rounded-lg hover:bg-red-400/10 transition-colors text-sm"
                    >
                      Generate New Key
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-400">
                    Generate your API key to access datasets programmatically. Rate limit: 25 requests per hour.
                  </p>
                  
                  <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">🔑 API Key Benefits</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>Higher Rate Limits:</strong> 25 requests/hour vs 10 downloads/hour</li>
                      <li>• <strong>Query Access:</strong> Filter and query datasets with SQL-like syntax</li>
                      <li>• <strong>Programmatic Access:</strong> Perfect for dashboards and applications</li>
                      <li>• <strong>Multiple Formats:</strong> JSON, CSV, and Excel downloads</li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={generateApiKey}
                    disabled={generatingKey}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {generatingKey ? 'Generating...' : 'Generate API Key'}
                  </button>
                </div>
              )}
            </div>

            {/* Rate Limits Information */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Rate Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-3 text-red-400">🚫 Without API Key</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• <strong>Downloads:</strong> 10 per hour</li>
                    <li>• <strong>API Access:</strong> Not available</li>
                    <li>• <strong>Queries:</strong> Not available</li>
                  </ul>
                  <div className="mt-3 text-xs text-gray-500">
                    Based on IP address tracking
                  </div>
                </div>
                
                <div className="p-4 border border-green-400/30 bg-green-400/5 rounded-lg">
                  <h4 className="font-medium mb-3 text-green-400">✅ With API Key</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• <strong>API Requests:</strong> 25 per hour</li>
                    <li>• <strong>Queries:</strong> Included in API limits</li>
                    <li>• <strong>Downloads:</strong> Included in API limits</li>
                  </ul>
                  <div className="mt-3 text-xs text-green-400">
                    Perfect for portfolio projects
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-400/10 border border-blue-400/20 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">💡 Best Practices</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use API keys for any automated or dashboard applications</li>
                  <li>• Cache responses when possible to reduce API calls</li>
                  <li>• Monitor rate limit headers in responses</li>
                  <li>• Use appropriate formats (JSON for APIs, CSV for analysis)</li>
                </ul>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6">API Endpoints</h3>
              <div className="space-y-6">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                        endpoint.method === 'GET' ? 'bg-green-400/20 text-green-400' : 'bg-blue-400/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-green-400 font-mono">{endpoint.endpoint}</code>
                      {endpoint.authRequired && (
                        <span className="ml-3 px-2 py-1 bg-red-400/20 text-red-400 text-xs rounded">
                          API Key Required
                        </span>
                      )}
                      {endpoint.note && (
                        <span className="ml-3 px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded">
                          Optional Auth
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-3">{endpoint.description}</p>
                    {endpoint.note && (
                      <p className="text-sm text-yellow-400 mb-3">{endpoint.note}</p>
                    )}
                    <div className="bg-gray-900 rounded p-3">
                      <div className="text-xs text-gray-500 mb-1">Example:</div>
                      <code className="text-sm text-gray-300 font-mono break-all">{endpoint.example}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Examples */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6">Code Examples</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 text-green-400">Python</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{`import requests
import pandas as pd

# Your API key
API_KEY = "your_api_key_here"
headers = {"Authorization": f"Bearer {API_KEY}"}

# Get all available datasets
response = requests.get("https://analysthub.com/api/datasets", headers=headers)
datasets = response.json()

# Get e-commerce dataset details
ecom_meta = requests.get(
    "https://analysthub.com/api/datasets/ecom-datamart", 
    headers=headers
)
print(f"Available tables: {ecom_meta.json()['dataset']['relatedTables']}")

# Download specific table as CSV (API key provides higher rate limits)
orders_csv = requests.get(
    "https://analysthub.com/api/datasets/ecom-datamart/download?format=csv&table=ecom_orders",
    headers=headers
)
with open('ecom_orders.csv', 'w') as f:
    f.write(orders_csv.text)

# Query with filters (requires API key)
query_data = {
    "table": "ecom_customers",
    "filters": {"city": "New York"},
    "limit": 1000,
    "orderBy": "customer_id"
}
result = requests.post(
    "https://analysthub.com/api/datasets/ecom-datamart/query",
    json=query_data,
    headers=headers
)
customers = result.json()['data']

# Check rate limits
remaining = result.headers.get('x-ratelimit-remaining')
print(f"API calls remaining: {remaining}")`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-green-400">JavaScript/Node.js</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{`const axios = require('axios');

// Your API key
const API_KEY = 'your_api_key_here';
const headers = { 'Authorization': \`Bearer \${API_KEY}\` };

// Fetch all datasets
async function getDatasets() {
  try {
    const response = await axios.get(
      'https://analysthub.com/api/datasets',
      { headers }
    );
    console.log('Available datasets:', response.data.datasets);
    
    // Get education dataset details
    const eduData = await axios.get(
      'https://analysthub.com/api/datasets/education-datamart',
      { headers }
    );
    console.log('Education tables:', eduData.data.dataset.relatedTables);
    
    // Query student data with filters (requires API key)
    const studentQuery = {
      table: "education_students",
      filters: { grade_level: "10" },
      limit: 500
    };
    
    const students = await axios.post(
      'https://analysthub.com/api/datasets/education-datamart/query',
      studentQuery,
      { headers }
    );
    
    // Check rate limits
    const remaining = students.headers['x-ratelimit-remaining'];
    console.log(\`Query calls remaining: \${remaining}\`);
    
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('Invalid API key. Please check your authentication.');
    } else if (error.response?.status === 429) {
      console.error('Rate limit exceeded:', error.response.data.error);
    } else {
      console.error('Error:', error.response?.data || error.message);
    }
  }
}

getDatasets();`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-green-400">R</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{`library(httr)
library(jsonlite)

# Get datasets
response <- GET("https://analysthub.com/api/datasets")
datasets <- content(response, "parsed")

# Download fitness data as CSV
fitness_url <- "https://analysthub.com/api/datasets/fitness-datamart/download?format=csv&table=fitness_workouts"
fitness_data <- read.csv(fitness_url)
head(fitness_data)

# Query entertainment data
query_body <- list(
  table = "music_plays",
  filters = list(genre = "pop"),
  limit = 1000,
  orderBy = "play_count DESC"
)

music_response <- POST(
  "https://analysthub.com/api/datasets/music-datamart/query",
  body = query_body,
  encode = "json"
)

music_data <- content(music_response, "parsed")
print(paste("Found", length(music_data$data), "music plays"))`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Connection Modal */}
      {showApiModal && selectedDataset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedDataset.name} - API Connection</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {selectedDataset.type === 'datamart' 
                      ? `Datamart with ${selectedDataset.tableCount} tables` 
                      : 'Single table dataset'}
                  </p>
                </div>
                <button
                  onClick={() => setShowApiModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* API Endpoints */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-400">API Endpoints</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <span className="text-gray-400">Base URL:</span>
                    <code className="ml-2 text-green-400">https://analysthub.com/api/datasets/{selectedDataset.id}</code>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <span className="text-gray-400">Download:</span>
                    <code className="ml-2 text-green-400">
                      /download{selectedDataset.type === 'datamart' ? '?format=xlsx' : '?format=csv'}
                    </code>
                  </div>
                </div>
              </div>

              {/* Power BI Connection */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-400">🔷 Power BI Connection</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-3">Connect to this dataset in Power BI:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">1. In Power BI Desktop, select "Get Data" → "Web"</p>
                      <div className="bg-gray-900 p-2 rounded">
                        <code className="text-xs text-green-400">
                          https://analysthub.com/api/datasets/{selectedDataset.id}/download?format=csv
                          {selectedDataset.type === 'datamart' && <span className="text-blue-400">&table=table_name</span>}
                        </code>
                      </div>
                    </div>
                    {selectedDataset.type === 'datamart' && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Available tables:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedDataset.relatedTables?.map((table: string, index: number) => (
                            <span key={index} className="text-xs bg-blue-400/10 text-blue-400 px-2 py-1 rounded">
                              {table}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 mb-1">2. For multiple tables (datamarts), create separate queries for each table</p>
                      <p className="text-xs text-gray-400">3. Use Power Query to establish relationships between tables</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Excel Connection */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-400">📊 Excel Connection</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-3">Import data into Excel:</p>
                  <div className="space-y-3">
                    {selectedDataset.type === 'datamart' ? (
                      <>
                        <div>
                          <p className="text-xs text-gray-400 mb-1"><strong>Option 1:</strong> Download complete datamart as Excel file</p>
                          <div className="bg-gray-900 p-2 rounded">
                            <code className="text-xs text-green-400">
                              https://analysthub.com/api/datasets/{selectedDataset.id}/download?format=xlsx
                            </code>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">This gives you all {selectedDataset.tableCount} tables as separate sheets</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1"><strong>Option 2:</strong> Import specific tables via Data → From Web</p>
                          <div className="bg-gray-900 p-2 rounded">
                            <code className="text-xs text-green-400">
                              https://analysthub.com/api/datasets/{selectedDataset.id}/download?format=csv&table=table_name
                            </code>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Go to Data → From Web and use this URL:</p>
                        <div className="bg-gray-900 p-2 rounded">
                          <code className="text-xs text-green-400">
                            https://analysthub.com/api/datasets/{selectedDataset.id}/download?format=csv
                          </code>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Python/R Connection */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-yellow-400">🐍 Python/R Connection</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Python (pandas):</p>
                      <div className="bg-gray-900 p-2 rounded">
                        <code className="text-xs text-gray-300">
                          import pandas as pd<br/>
                          df = pd.read_csv('<br/>
                          &nbsp;&nbsp;'https://analysthub.com/api/datasets/{selectedDataset.id}/download?format=csv'<br/>
                          )
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">R:</p>
                      <div className="bg-gray-900 p-2 rounded">
                        <code className="text-xs text-gray-300">
                          library(readr)<br/>
                          df &lt;- read_csv(<br/>
                          &nbsp;&nbsp;'https://analysthub.com/api/datasets/{selectedDataset.id}/download?format=csv'<br/>
                          )
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy Button */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    const url = `https://analysthub.com/api/datasets/${selectedDataset.id}/download?format=${selectedDataset.type === 'datamart' ? 'xlsx' : 'csv'}`
                    navigator.clipboard.writeText(url)
                    alert('Primary download URL copied to clipboard!')
                  }}
                  className="flex-1 px-4 py-2 bg-green-400 text-gray-900 rounded-lg hover:bg-green-300 transition-colors text-sm font-medium"
                >
                  Copy Download URL
                </button>
                <button
                  onClick={() => {
                    const baseUrl = `https://analysthub.com/api/datasets/${selectedDataset.id}`
                    navigator.clipboard.writeText(baseUrl)
                    alert('Base API URL copied to clipboard!')
                  }}
                  className="flex-1 px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors text-sm font-medium"
                >
                  Copy API Base URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 