'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
    correct: 0,
    category: "SQL"
  },
  {
    id: 2,
    question: "Which function would you use to find the average of values in a column?",
    options: ["SUM()", "AVG()", "MEAN()", "AVERAGE()"],
    correct: 1,
    category: "SQL"
  },
  {
    id: 3,
    question: "In Excel, what does VLOOKUP stand for?",
    options: ["Vertical Lookup", "Value Lookup", "Variable Lookup", "Vector Lookup"],
    correct: 0,
    category: "Excel"
  },
  {
    id: 4,
    question: "Which chart type is best for showing trends over time?",
    options: ["Pie Chart", "Bar Chart", "Line Chart", "Scatter Plot"],
    correct: 2,
    category: "Visualization"
  },
  {
    id: 5,
    question: "What is a KPI?",
    options: ["Keep Performance Index", "Key Performance Indicator", "Key Process Integration", "Keep Process Indicator"],
    correct: 1,
    category: "Business"
  }
]

export default function SkillAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
      }
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent! You have strong analytics fundamentals."
    if (score >= 60) return "Good foundation! A few areas to strengthen."
    if (score >= 40) return "Getting there! Focus on building core skills."
    return "Great starting point! Lots of room to grow."
  }

  const getCategoryBreakdown = () => {
    const categories = questions.reduce((acc, question, index) => {
      const category = question.category
      if (!acc[category]) {
        acc[category] = { correct: 0, total: 0 }
      }
      acc[category].total++
      if (answers[index] === question.correct) {
        acc[category].correct++
      }
      return acc
    }, {} as Record<string, { correct: number; total: number }>)

    return Object.entries(categories).map(([category, stats]) => ({
      category,
      score: Math.round((stats.correct / stats.total) * 100)
    }))
  }

  if (showResults) {
    const score = calculateScore()
    const categoryBreakdown = getCategoryBreakdown()

    return (
      <div className="min-h-screen bg-gray-950 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tools" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>

          <div className="glass rounded-xl p-8 text-center">
            <div className="w-24 h-24 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-green-400">{score}%</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Assessment Complete!</h1>
            <p className="text-xl text-gray-400 mb-8">{getScoreMessage(score)}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
                <div className="space-y-3">
                  {categoryBreakdown.map(({ category, score }) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-300">{category}</span>
                      <span className={`font-medium ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recommended Next Steps</h3>
                <div className="space-y-2 text-left">
                  {score < 60 && (
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-300">Focus on SQL fundamentals</span>
                    </div>
                  )}
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-300">Review our learning guides</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-300">Practice with real projects</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-300">Use our AI tools for personalized feedback</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learning" className="btn-primary">
                View Learning Paths
              </Link>
              <Link href="/tools" className="px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors">
                Explore Premium Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tools" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>

        <div className="glass rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Analytics Skill Assessment</h1>
            <div className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    selectedAnswer === index
                      ? 'border-green-400 bg-green-400/10 text-green-400'
                      : 'border-gray-700 hover:border-gray-600 text-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1)
                  setSelectedAnswer(answers[currentQuestion - 1] || null)
                }
              }}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 