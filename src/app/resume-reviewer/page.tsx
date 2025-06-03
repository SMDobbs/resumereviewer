'use client'

import { useState } from 'react'
import { 
  DocumentTextIcon, 
  CloudArrowUpIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface ResumeAnalysis {
  overallScore: number
  overallAssessment: string
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  keywordOptimization: string
  formattingScore: number
  contentScore: number
  skillsScore: number
  analyticsExperienceScore: number
}

export default function ResumeReviewerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [jobCriteria, setJobCriteria] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)

  // Hidden default prompt that users don't see
  const defaultReviewPrompt = `Focus on the following areas when reviewing this resume:
1. Relevance to the specified job criteria
2. Technical skills alignment
3. Quantified achievements and impact metrics
4. ATS optimization and keyword usage
5. Professional formatting and structure
6. Career progression and growth
7. Industry-specific experience

Rate each section from 1-10 and provide specific, actionable feedback.`

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']
      const validExtensions = ['.pdf', '.docx', '.doc', '.txt']
      
      const hasValidType = validTypes.includes(droppedFile.type)
      const hasValidExtension = validExtensions.some(ext => droppedFile.name.toLowerCase().endsWith(ext))
      
      if (hasValidType || hasValidExtension) {
        setFile(droppedFile)
        setError('')
      } else {
        setError('Please upload PDF, DOCX, DOC, or TXT files only.')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']
      const validExtensions = ['.pdf', '.docx', '.doc', '.txt']
      
      const hasValidType = validTypes.includes(selectedFile.type)
      const hasValidExtension = validExtensions.some(ext => selectedFile.name.toLowerCase().endsWith(ext))
      
      if (hasValidType || hasValidExtension) {
        setFile(selectedFile)
        setError('')
      } else {
        setError('Please upload PDF, DOCX, DOC, or TXT files only.')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file || !jobCriteria.trim()) {
      setError('Please upload a resume and describe the target role')
      return
    }

    setIsAnalyzing(true)
    setError('')
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('jobCriteria', jobCriteria)
      formData.append('reviewPrompt', defaultReviewPrompt)

      const response = await fetch('/api/resume-review', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume')
      }

      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400'
    if (score >= 6) return 'text-amber-400'
    return 'text-red-400'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-emerald-500/20 border border-emerald-500/30'
    if (score >= 6) return 'bg-amber-500/20 border border-amber-500/30'
    return 'bg-red-500/20 border border-red-500/30'
  }

  const getProgressWidth = (score: number) => {
    return `${(score / 10) * 100}%`
  }

  const getProgressColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-400'
    if (score >= 6) return 'bg-amber-400'
    return 'bg-red-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-6">
            <SparklesIcon className="h-4 w-4 text-emerald-400 mr-2" />
            <span className="text-sm font-medium text-emerald-400">Powered by GPT-4</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            AI Resume Reviewer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get instant, expert feedback on your resume. Upload your file, describe your target role, and receive detailed insights in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {!analysis ? (
          /* Input Form */
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* File Upload */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                  <DocumentTextIcon className="h-6 w-6 text-emerald-400 mr-3" />
                  Upload Your Resume
                </h3>
                
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-emerald-400 bg-emerald-400/10 scale-[1.02]' 
                      : file 
                        ? 'border-emerald-400 bg-emerald-400/5'
                        : 'border-gray-600 hover:border-gray-500 hover:bg-white/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {file ? (
                    <div className="flex flex-col items-center">
                      <CheckCircleIcon className="h-16 w-16 text-emerald-400 mb-4" />
                      <p className="text-xl font-semibold text-emerald-400 mb-2">{file.name}</p>
                      <p className="text-gray-400">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <CloudArrowUpIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                      <p className="text-2xl font-semibold mb-2 text-white">Drop your resume here</p>
                      <p className="text-gray-400 mb-4">or click to browse files</p>
                      <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-300">PDF, DOCX, DOC, or TXT files</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                  <SparklesIcon className="h-6 w-6 text-emerald-400 mr-3" />
                  Target Role Description
                </h3>
                <textarea
                  value={jobCriteria}
                  onChange={(e) => setJobCriteria(e.target.value)}
                  placeholder="Describe the role you're targeting or paste the job description here..."
                  className="w-full h-40 px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 resize-none text-white placeholder-gray-500 text-lg"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAnalyzing || !file || !jobCriteria.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-6 px-8 rounded-2xl text-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white mr-3"></div>
                    Analyzing Your Resume...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Analyze My Resume</span>
                    <ArrowRightIcon className="ml-3 h-6 w-6" />
                  </div>
                )}
              </button>

              {error && (
                <div className="flex items-center p-6 bg-red-900/30 border border-red-500/30 rounded-2xl backdrop-blur-xl">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-400 mr-3" />
                  <p className="text-red-400 text-lg">{error}</p>
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Results */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Overall Score */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 mb-6">
                  <span className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Overall Score</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">{analysis.overallAssessment}</p>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-white">Performance Breakdown</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Content Quality</span>
                    <span className={`font-bold ${getScoreColor(analysis.contentScore)}`}>
                      {analysis.contentScore}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(analysis.contentScore)}`}
                      style={{ width: getProgressWidth(analysis.contentScore) }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Formatting</span>
                    <span className={`font-bold ${getScoreColor(analysis.formattingScore)}`}>
                      {analysis.formattingScore}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(analysis.formattingScore)}`}
                      style={{ width: getProgressWidth(analysis.formattingScore) }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Analytics Skills</span>
                    <span className={`font-bold ${getScoreColor(analysis.skillsScore)}`}>
                      {analysis.skillsScore}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(analysis.skillsScore)}`}
                      style={{ width: getProgressWidth(analysis.skillsScore) }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Analytics Experience</span>
                    <span className={`font-bold ${getScoreColor(analysis.analyticsExperienceScore)}`}>
                      {analysis.analyticsExperienceScore}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(analysis.analyticsExperienceScore)}`}
                      style={{ width: getProgressWidth(analysis.analyticsExperienceScore) }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-emerald-400 flex items-center">
                <CheckCircleIcon className="h-6 w-6 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-amber-400 flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center">
                <LightBulbIcon className="h-6 w-6 mr-2" />
                Actionable Recommendations
              </h3>
              <ul className="space-y-4">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <span className="text-xs font-bold text-gray-900">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ATS Optimization */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-purple-400">ATS & Keywords</h3>
              <p className="text-gray-300 leading-relaxed">{analysis.keywordOptimization}</p>
            </div>

            {/* Try Again Button */}
            <div className="lg:col-span-3 text-center pt-8">
              <button
                onClick={() => {
                  setAnalysis(null)
                  setFile(null)
                  setJobCriteria('')
                  setError('')
                }}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-lg font-medium"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 