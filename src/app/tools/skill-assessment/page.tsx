'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CodeBracketIcon,
  SparklesIcon,
  ArrowPathIcon,
  LightBulbIcon,
  FlagIcon,
  PlayIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'

interface Question {
  id: number
  question: string
  type: 'multiple-choice' | 'text-input'
  options?: string[]
  correct: number | string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  explanation: string
  scenario?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does SQL stand for?",
    type: "multiple-choice",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
    correct: 0,
    category: "SQL Fundamentals",
    difficulty: "beginner",
    explanation: "SQL stands for Structured Query Language, the standard language for relational database management systems."
  },
  {
    id: 2,
    question: "Which aggregate function would you use to count the number of non-null values in a column?",
    type: "multiple-choice",
    options: ["SUM()", "AVG()", "COUNT()", "TOTAL()"],
    correct: 2,
    category: "SQL Fundamentals",
    difficulty: "beginner",
    explanation: "COUNT() returns the number of non-null values in a column, while COUNT(*) counts all rows including nulls."
  },
  {
    id: 3,
    scenario: "You want to calculate total revenue: SELECT product_id, SUM(quantity * price_per_unit) AS total_revenue FROM sales _____ product_id",
    question: "What clause should fill the blank to group results by product?",
    type: "text-input",
    correct: "GROUP BY",
    category: "Aggregation & Grouping",
    difficulty: "intermediate",
    explanation: "GROUP BY is used to group rows that have the same values in specified columns, enabling aggregate calculations per group."
  },
  {
    id: 4,
    question: "What is the difference between WHERE and HAVING clauses?",
    type: "multiple-choice",
    options: [
      "WHERE filters rows before grouping, HAVING filters groups after aggregation",
      "WHERE and HAVING are identical and interchangeable",
      "WHERE is used with SELECT, HAVING is used with INSERT",
      "WHERE filters columns, HAVING filters rows"
    ],
    correct: 0,
    category: "Filtering & Conditions",
    difficulty: "intermediate",
    explanation: "WHERE filters individual rows before grouping occurs, while HAVING filters groups after aggregation functions are applied."
  },
  {
    id: 5,
    question: "Which JOIN type returns only matching records from both tables?",
    type: "multiple-choice",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
    correct: 2,
    category: "JOINs & Relationships",
    difficulty: "beginner",
    explanation: "INNER JOIN returns only rows that have matching values in both tables being joined."
  },
  {
    id: 6,
    scenario: "To find customers who never placed an order: SELECT c.customer_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.customer_id _____ NULL",
    question: "What operator should fill the blank?",
    type: "multiple-choice",
    options: ["=", "!=", "IS", "IS NOT"],
    correct: 2,
    category: "JOINs & Relationships",
    difficulty: "intermediate",
    explanation: "Use 'IS NULL' to check for NULL values. You cannot use = or != with NULL in SQL."
  },
  {
    id: 7,
    question: "What does the DISTINCT keyword do in a SQL query?",
    type: "multiple-choice",
    options: [
      "Sorts results in ascending order",
      "Removes duplicate rows from the result set",
      "Filters out NULL values",
      "Joins tables together"
    ],
    correct: 1,
    category: "Filtering & Conditions",
    difficulty: "beginner",
    explanation: "DISTINCT removes duplicate rows from the result set, returning only unique combinations of the selected columns."
  },
  {
    id: 8,
    scenario: "You need to analyze monthly sales trends over the past year",
    question: "Which SQL function would you use to extract the month from a date column?",
    type: "multiple-choice",
    options: ["DATE()", "MONTH()", "EXTRACT()", "Both MONTH() and EXTRACT()"],
    correct: 3,
    category: "Date & Time Functions",
    difficulty: "intermediate",
    explanation: "Both MONTH(date_column) and EXTRACT(MONTH FROM date_column) can extract the month, though syntax varies by database system."
  },
  {
    id: 9,
    scenario: "To rank customers by order amount: SELECT customer_id, total_amount, _____ OVER (ORDER BY total_amount DESC) as rank FROM customer_totals",
    question: "What window function should fill the blank?",
    type: "text-input",
    correct: "ROW_NUMBER()",
    category: "Advanced Analytics",
    difficulty: "advanced",
    explanation: "ROW_NUMBER() assigns a unique sequential integer to rows within a partition, ordered by the specified column(s)."
  },
  {
    id: 10,
    question: "What is a foreign key constraint used for?",
    type: "multiple-choice",
    options: [
      "To ensure data uniqueness within a table",
      "To establish relationships between tables and maintain referential integrity",
      "To automatically increment values",
      "To create indexes for faster queries"
    ],
    correct: 1,
    category: "Database Design",
    difficulty: "intermediate",
    explanation: "Foreign keys establish and enforce relationships between tables, ensuring referential integrity by preventing invalid references."
  },
  {
    id: 11,
    scenario: "For running totals: SELECT sale_date, revenue, SUM(revenue) _____ (ORDER BY sale_date) AS running_total FROM sales",
    question: "What clause should fill the blank?",
    type: "text-input",
    correct: "OVER",
    category: "Advanced Analytics",
    difficulty: "advanced",
    explanation: "The OVER clause is used with window functions to define the window of rows for the calculation."
  },
  {
    id: 12,
    question: "Which operator would you use to check if a value exists within a subquery result?",
    type: "multiple-choice",
    options: ["IN", "EXISTS", "LIKE", "Both IN and EXISTS"],
    correct: 3,
    category: "Subqueries & Operations",
    difficulty: "intermediate",
    explanation: "Both IN and EXISTS can check for value existence in subqueries, though EXISTS is often more efficient for large datasets."
  },
  {
    id: 13,
    question: "What does NULL represent in SQL?",
    type: "multiple-choice",
    options: [
      "Zero value",
      "Empty string",
      "Unknown or missing value",
      "False value"
    ],
    correct: 2,
    category: "SQL Fundamentals",
    difficulty: "beginner",
    explanation: "NULL represents unknown, missing, or inapplicable data - it's different from zero, empty string, or false."
  },
  {
    id: 14,
    scenario: "For sales performance: CASE WHEN revenue > 10000 THEN 'High' WHEN revenue > 5000 THEN 'Medium' _____ 'Low' END as performance",
    question: "What keyword should fill the blank?",
    type: "text-input",
    correct: "ELSE",
    category: "Filtering & Conditions",
    difficulty: "intermediate",
    explanation: "CASE statements use ELSE to handle all remaining conditions that don't match the WHEN clauses."
  },
  {
    id: 15,
    question: "Which statement about indexes is TRUE?",
    type: "multiple-choice",
    options: [
      "Indexes slow down SELECT queries but speed up INSERT operations",
      "Indexes speed up SELECT queries but can slow down INSERT/UPDATE/DELETE operations",
      "Indexes have no impact on query performance",
      "Indexes only work with numeric columns"
    ],
    correct: 1,
    category: "Database Design",
    difficulty: "intermediate",
    explanation: "Indexes improve SELECT query performance by providing faster data access paths, but require maintenance during data modifications."
  },
  {
    id: 16,
    question: "To get the top 3 highest paid employees per department, which window function would you use?",
    type: "multiple-choice",
    options: ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "Any of the above"],
    correct: 3,
    category: "Advanced Analytics",
    difficulty: "advanced",
    explanation: "ROW_NUMBER(), RANK(), or DENSE_RANK() can all be used depending on how you want to handle ties in the ranking."
  },
  {
    id: 17,
    question: "What is the purpose of the GROUP BY clause?",
    type: "multiple-choice",
    options: [
      "To sort results in ascending order",
      "To combine rows with identical values in specified columns for aggregate calculations",
      "To filter individual rows",
      "To join multiple tables"
    ],
    correct: 1,
    category: "Aggregation & Grouping",
    difficulty: "beginner",
    explanation: "GROUP BY combines rows with the same values in specified columns, allowing aggregate functions to be calculated for each group."
  },
  {
    id: 18,
    question: "Which SQL clause would you use to limit the number of rows returned?",
    type: "multiple-choice",
    options: ["WHERE", "HAVING", "LIMIT", "GROUP BY"],
    correct: 2,
    category: "Filtering & Conditions",
    difficulty: "beginner",
    explanation: "LIMIT restricts the number of rows returned by a query. Note: Some databases use TOP instead of LIMIT."
  },
  {
    id: 19,
    scenario: "You need to find products that appear in both Q1 and Q2 sales",
    question: "Which set operation would you use to find common records between two result sets?",
    type: "multiple-choice",
    options: ["UNION", "INTERSECT", "EXCEPT", "JOIN"],
    correct: 1,
    category: "Subqueries & Operations",
    difficulty: "intermediate",
    explanation: "INTERSECT returns only the rows that appear in both result sets, perfect for finding common records."
  },
  {
    id: 20,
    scenario: "For data pivoting: SELECT * FROM (SELECT month, sales FROM monthly_data) _____ (SUM(sales) FOR month IN ('Jan', 'Feb', 'Mar'))",
    question: "What operation should fill the blank?",
    type: "text-input",
    correct: "PIVOT",
    category: "Advanced Analytics",
    difficulty: "advanced",
    explanation: "PIVOT transforms rows into columns. It's used to rotate data from a normalized format to a more readable format."
  }
]

export default function SkillAssessmentPage() {
  const { user } = useUser()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | string)[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [textAnswer, setTextAnswer] = useState<string>('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [aifeedback, setAiFeedback] = useState<string | null>(null)
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [savedToDatabase, setSavedToDatabase] = useState(false)

  // Start timer immediately when component mounts
  useEffect(() => {
    if (!startTime) {
      setStartTime(new Date())
    }
  }, [startTime])

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime && !showResults) {
        setTimeElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime, showResults])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleTextChange = (value: string) => {
    setTextAnswer(value)
  }

  const handleNext = () => {
    const currentQ = questions[currentQuestion]
    let answer: number | string
    
    if (currentQ.type === 'multiple-choice') {
      if (selectedAnswer === null) return
      answer = selectedAnswer
    } else {
      if (!textAnswer.trim()) return
      answer = textAnswer.trim()
    }

    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTextAnswer('')
    } else {
      setShowResults(true)
      generateAIFeedback(newAnswers)
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (index >= questions.length || answer === undefined || answer === null) return
      
      const question = questions[index]
      if (question.type === 'multiple-choice') {
        if (answer === question.correct) correct++
      } else {
        // For text answers, we'll do a basic comparison (in real app, you'd want more sophisticated matching)
        const userAnswer = String(answer).toLowerCase().replace(/\s+/g, ' ').trim()
        const correctAnswer = (question.correct as string).toLowerCase().replace(/\s+/g, ' ').trim()
        if (userAnswer.includes(correctAnswer.substring(0, Math.min(20, correctAnswer.length)))) {
          correct++
        }
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const getSkillLevel = (score: number) => {
    if (score >= 80) return { level: 'Advanced', color: 'text-green-400', description: 'Expert-level SQL skills for analytics' }
    if (score >= 60) return { level: 'Intermediate', color: 'text-yellow-400', description: 'Solid foundation with room for advanced techniques' }
    return { level: 'Beginner', color: 'text-red-400', description: 'Building fundamental SQL knowledge' }
  }

  const getCategoryBreakdown = () => {
    const categories = questions.reduce((acc, question, index) => {
      if (index >= answers.length || answers[index] === undefined || answers[index] === null) return acc
      
      const category = question.category
      if (!acc[category]) {
        acc[category] = { correct: 0, total: 0, difficulty: question.difficulty }
      }
      acc[category].total++
      
      const answer = answers[index]
      if (question.type === 'multiple-choice') {
        if (answer === question.correct) acc[category].correct++
      } else {
        const userAnswer = String(answer).toLowerCase().replace(/\s+/g, ' ').trim()
        const correctAnswer = (question.correct as string).toLowerCase().replace(/\s+/g, ' ').trim()
        if (userAnswer.includes(correctAnswer.substring(0, Math.min(20, correctAnswer.length)))) {
          acc[category].correct++
        }
      }
      return acc
    }, {} as Record<string, { correct: number; total: number; difficulty: string }>)

    return Object.entries(categories).map(([category, stats]) => ({
      category,
      score: Math.round((stats.correct / stats.total) * 100),
      difficulty: stats.difficulty
    }))
  }

  const saveResults = async (userAnswers: (number | string)[], feedback: string | null) => {
    try {
      const score = calculateScore()
      const skillLevel = getSkillLevel(score)
      const categoryBreakdown = getCategoryBreakdown()

      const response = await fetch('/api/save-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          score,
          timeElapsed,
          skillLevel: skillLevel.level,
          categoryBreakdown,
          answers: userAnswers,
          aiFeedback: feedback
        })
      })

      if (response.ok) {
        setSavedToDatabase(true)
      }
    } catch (error) {
      console.error('Failed to save assessment results:', error)
    }
  }

  const restartAssessment = () => {
    // Reset all assessment state
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedAnswer(null)
    setTextAnswer('')
    setTimeElapsed(0)
    setStartTime(new Date()) // Start new timer immediately
    setAiFeedback(null)
    setLoadingFeedback(false)
    setSavedToDatabase(false)
  }

  const generateAIFeedback = async (userAnswers: (number | string)[]) => {
    setLoadingFeedback(true)
    
    try {
      const score = calculateScore()
      const categoryBreakdown = getCategoryBreakdown()
      const skillLevel = getSkillLevel(score)
      
      // Prepare analysis for AI
      const wrongAnswers = questions.filter((q, index) => {
        if (index >= userAnswers.length || userAnswers[index] === undefined) return false
        
        if (q.type === 'multiple-choice') {
          return userAnswers[index] !== q.correct
        } else {
          const userAnswer = String(userAnswers[index]).toLowerCase().replace(/\s+/g, ' ').trim()
          const correctAnswer = (q.correct as string).toLowerCase().replace(/\s+/g, ' ').trim()
          return !userAnswer.includes(correctAnswer.substring(0, Math.min(20, correctAnswer.length)))
        }
      })

      const prompt = `As an SQL expert and analytics coach, provide personalized feedback for this assessment:

Score: ${score}%
Skill Level: ${skillLevel.level}
Time Taken: ${Math.floor(timeElapsed / 60)} minutes

Category Performance:
${categoryBreakdown.map(cat => `${cat.category}: ${cat.score}% (${cat.difficulty})`).join('\n')}

Areas needing improvement:
${wrongAnswers.map(q => `- ${q.category}: ${q.question}`).join('\n')}

Please provide:
1. A personalized assessment summary (2-3 sentences)
2. Top 3 specific areas to focus on for improvement
3. Recommended learning path with specific topics
4. Next steps to advance their analytics SQL skills

Keep it encouraging but honest, focusing on practical skills for data analysts.`

      const response = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      let feedback = null
      if (response.ok) {
        const data = await response.json()
        feedback = data.feedback
        setAiFeedback(feedback)
      } else {
        feedback = "Unable to generate personalized feedback at this time. Based on your performance, focus on practicing the areas where you scored below 70%."
        setAiFeedback(feedback)
      }

      // Save results to database after getting feedback
      await saveResults(userAnswers, feedback)

    } catch (error) {
      console.error('AI Feedback Error:', error)
      const fallbackFeedback = "Focus on strengthening your weakest categories and practice writing SQL queries for real business scenarios."
      setAiFeedback(fallbackFeedback)
      await saveResults(userAnswers, fallbackFeedback)
    } finally {
      setLoadingFeedback(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Add function to parse AI feedback
  const parseAIFeedback = (feedback: string) => {
    const sections = {
      summary: '',
      focusAreas: [] as string[],
      nextSteps: [] as string[],
      skillLevel: '',
      skillDescription: ''
    }

    // Split by section headers - using [\s\S] instead of . with s flag for compatibility
    const summaryMatch = feedback.match(/\*\*Assessment Summary\*\*\s*([\s\S]*?)(?=\*\*|$)/)
    if (summaryMatch) {
      sections.summary = summaryMatch[1].trim()
    }

    const focusAreasMatch = feedback.match(/\*\*Priority Focus Areas\*\*\s*([\s\S]*?)(?=\*\*|$)/)
    if (focusAreasMatch) {
      sections.focusAreas = focusAreasMatch[1]
        .split('•')
        .filter(item => item.trim())
        .map(item => item.trim())
    }

    const nextStepsMatch = feedback.match(/\*\*Next Steps\*\*\s*([\s\S]*?)(?=\*\*|$)/)
    if (nextStepsMatch) {
      sections.nextSteps = nextStepsMatch[1]
        .split('•')
        .filter(item => item.trim())
        .map(item => item.trim())
    }

    const skillLevelMatch = feedback.match(/\*\*Skill Level:\s*(.*?)\*\*\s*([\s\S]*?)(?=\*\*|$)/)
    if (skillLevelMatch) {
      sections.skillLevel = skillLevelMatch[1].trim()
      sections.skillDescription = skillLevelMatch[2].trim()
    }

    return sections
  }

  if (showResults) {
    const score = calculateScore()
    const categoryBreakdown = getCategoryBreakdown()
    const skillLevel = getSkillLevel(score)

    return (
      <div className="min-h-screen bg-gray-950 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tools" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>

          {/* Header Results */}
          <div className="glass rounded-xl p-8 text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-300 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{score}%</span>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold mb-2">SQL Assessment Complete!</h1>
                <div className="flex items-center gap-4 text-lg">
                  <span className={`font-semibold ${skillLevel.color}`}>{skillLevel.level}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400 flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {formatTime(timeElapsed)}
                  </span>
                  {savedToDatabase && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-green-400 flex items-center text-sm">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Results Saved
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-400">{skillLevel.description}</p>
            {savedToDatabase && user && (
              <p className="text-sm text-green-400 mt-2">
                💡 Your results have been saved to track your progress over time!
              </p>
            )}
            {savedToDatabase && !user && (
              <p className="text-sm text-yellow-400 mt-2">
                💡 Results saved anonymously. Sign up to track your progress over time!
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Breakdown */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-green-400" />
                Category Performance
              </h3>
              <div className="space-y-4">
                {categoryBreakdown.map(({ category, score, difficulty }) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-300 font-medium">{category}</span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                          difficulty === 'advanced' ? 'bg-red-400/20 text-red-400' :
                          difficulty === 'intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-green-400/20 text-green-400'
                        }`}>
                          {difficulty}
                        </span>
                      </div>
                      <span className={`font-bold ${
                        score >= 80 ? 'text-green-400' : 
                        score >= 60 ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          score >= 80 ? 'bg-green-400' : 
                          score >= 60 ? 'bg-yellow-400' : 
                          'bg-red-400'
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-purple-400" />
                AI-Powered Feedback
              </h3>
              
              {loadingFeedback ? (
                <div className="flex items-center justify-center py-8">
                  <ArrowPathIcon className="h-8 w-8 text-purple-400 animate-spin mr-3" />
                  <span className="text-gray-400">Analyzing your performance...</span>
                </div>
              ) : aifeedback ? (
                <div className="space-y-6">
                  {(() => {
                    const parsed = parseAIFeedback(aifeedback)
                    return (
                      <>
                        {/* Assessment Summary */}
                        {parsed.summary && (
                          <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <AcademicCapIcon className="h-5 w-5 text-blue-400 mr-2" />
                              <h4 className="font-semibold text-blue-400">Assessment Summary</h4>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{parsed.summary}</p>
                          </div>
                        )}

                        {/* Priority Focus Areas */}
                        {parsed.focusAreas.length > 0 && (
                          <div className="bg-orange-400/10 border border-orange-400/20 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <FlagIcon className="h-5 w-5 text-orange-400 mr-2" />
                              <h4 className="font-semibold text-orange-400">Priority Focus Areas</h4>
                            </div>
                            <div className="space-y-3">
                              {parsed.focusAreas.map((area, index) => (
                                <div key={index} className="flex items-start">
                                  <div className="w-6 h-6 bg-orange-400/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    <span className="text-orange-400 text-xs font-bold">{index + 1}</span>
                                  </div>
                                  <p className="text-gray-300 text-sm leading-relaxed">{area}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Next Steps */}
                        {parsed.nextSteps.length > 0 && (
                          <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <PlayIcon className="h-5 w-5 text-green-400 mr-2" />
                              <h4 className="font-semibold text-green-400">Next Steps</h4>
                            </div>
                            <div className="space-y-2">
                              {parsed.nextSteps.map((step, index) => (
                                <div key={index} className="flex items-start">
                                  <CheckCircleIcon className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                  <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skill Level */}
                        {parsed.skillLevel && (
                          <div className="bg-purple-400/10 border border-purple-400/20 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <StarIcon className="h-5 w-5 text-purple-400 mr-2" />
                              <h4 className="font-semibold text-purple-400">Skill Level Assessment</h4>
                            </div>
                            <div className="flex items-center mb-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-bold mr-3 ${
                                parsed.skillLevel === 'Advanced' ? 'bg-green-400 text-gray-900' :
                                parsed.skillLevel === 'Intermediate' ? 'bg-yellow-400 text-gray-900' :
                                'bg-red-400 text-white'
                              }`}>
                                {parsed.skillLevel}
                              </span>
                            </div>
                            {parsed.skillDescription && (
                              <p className="text-gray-300 text-sm leading-relaxed">{parsed.skillDescription}</p>
                            )}
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <LightBulbIcon className="h-8 w-8 mx-auto mb-3 text-gray-500" />
                  <p>AI feedback unavailable. Focus on improving your lowest-scoring categories.</p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="glass rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <AcademicCapIcon className="h-5 w-5 mr-2 text-blue-400" />
              Question Review
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = answers[index]
                let isCorrect = false
                
                if (question.type === 'multiple-choice') {
                  isCorrect = userAnswer === question.correct
                } else {
                  const userText = (userAnswer as string).toLowerCase().replace(/\s+/g, ' ').trim()
                  const correctText = (question.correct as string).toLowerCase().replace(/\s+/g, ' ').trim()
                  isCorrect = userText.includes(correctText.substring(0, Math.min(20, correctText.length)))
                }

                return (
                  <div key={question.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'border-green-400/30 bg-green-400/5' : 'border-red-400/30 bg-red-400/5'
                  }`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-300">Q{question.id}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            question.difficulty === 'advanced' ? 'bg-red-400/20 text-red-400' :
                            question.difficulty === 'intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-green-400/20 text-green-400'
                          }`}>
                            {question.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{question.category}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{question.question}</p>
                        {!isCorrect && (
                          <p className="text-xs text-gray-400 italic">{question.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartAssessment}
              className="btn-primary flex items-center justify-center"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Take Another Assessment
            </button>
            <Link href="/tools/data-export" className="px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors text-center">
              Practice with Real Data
            </Link>
            <Link href="/tools" className="px-6 py-3 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors text-center">
              Explore More Tools
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tools" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>

        <div className="glass rounded-xl p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">SQL Analytics Assessment</h1>
              <p className="text-gray-400">20 questions covering real-world analyst scenarios</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-sm text-green-400 flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                {formatTime(timeElapsed)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 mb-8">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-300 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentQ.difficulty === 'advanced' ? 'bg-red-400/20 text-red-400' :
                currentQ.difficulty === 'intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                'bg-green-400/20 text-green-400'
              }`}>
                {currentQ.difficulty}
              </span>
              <span className="text-sm text-gray-500">{currentQ.category}</span>
            </div>

            {currentQ.scenario && (
              <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4 mb-4">
                <p className="text-blue-300 text-sm">
                  <strong>Scenario:</strong> {currentQ.scenario}
                </p>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

            {currentQ.type === 'multiple-choice' ? (
              <div className="space-y-3">
                {currentQ.options!.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left border rounded-lg transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-green-400 bg-green-400/10 text-green-400 shadow-lg'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm ${
                        selectedAnswer === index
                          ? 'border-green-400 bg-green-400 text-gray-900'
                          : 'border-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={textAnswer}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Write your SQL query here..."
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 font-mono text-sm resize-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                  rows={6}
                />
                <p className="text-xs text-gray-500 flex items-center">
                  <CodeBracketIcon className="h-4 w-4 mr-1" />
                  Write your answer in SQL syntax. Focus on the core logic rather than perfect syntax.
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1)
                  const prevAnswer = answers[currentQuestion - 1]
                  if (questions[currentQuestion - 1].type === 'multiple-choice') {
                    setSelectedAnswer(prevAnswer as number)
                    setTextAnswer('')
                  } else {
                    setTextAnswer(prevAnswer as string)
                    setSelectedAnswer(null)
                  }
                }
              }}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={
                currentQ.type === 'multiple-choice' 
                  ? selectedAnswer === null 
                  : !textAnswer.trim()
              }
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {currentQuestion === questions.length - 1 ? (
                <>
                  <AcademicCapIcon className="h-4 w-4 mr-2" />
                  Finish Assessment
                </>
              ) : (
                'Next Question'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 