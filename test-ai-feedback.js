#!/usr/bin/env node

/**
 * Test script for SQL Assessment AI Feedback
 * Usage: node test-ai-feedback.js
 * 
 * Tests different performance scenarios to validate AI feedback quality
 */

const scenarios = [
  {
    name: "Beginner Performance",
    score: 35,
    timeElapsed: 900, // 15 minutes
    skillLevel: "Beginner",
    categoryBreakdown: [
      { category: "SQL Fundamentals", score: 50, difficulty: "beginner" },
      { category: "Aggregation & Grouping", score: 25, difficulty: "intermediate" },
      { category: "Filtering & Conditions", score: 40, difficulty: "beginner" },
      { category: "JOINs & Relationships", score: 0, difficulty: "intermediate" },
      { category: "Advanced Analytics", score: 0, difficulty: "advanced" }
    ],
    wrongAnswers: [
      "JOINs & Relationships: Which JOIN type returns only matching records",
      "Advanced Analytics: Window function for ranking",
      "Aggregation & Grouping: GROUP BY clause usage"
    ]
  },
  {
    name: "Intermediate Performance", 
    score: 70,
    timeElapsed: 720, // 12 minutes
    skillLevel: "Intermediate",
    categoryBreakdown: [
      { category: "SQL Fundamentals", score: 100, difficulty: "beginner" },
      { category: "Aggregation & Grouping", score: 75, difficulty: "intermediate" },
      { category: "Filtering & Conditions", score: 80, difficulty: "beginner" },
      { category: "JOINs & Relationships", score: 50, difficulty: "intermediate" },
      { category: "Advanced Analytics", score: 25, difficulty: "advanced" }
    ],
    wrongAnswers: [
      "Advanced Analytics: Window functions with OVER clause",
      "JOINs & Relationships: LEFT JOIN with NULL checking",
      "Database Design: Foreign key constraints"
    ]
  },
  {
    name: "Advanced Performance",
    score: 90,
    timeElapsed: 600, // 10 minutes
    skillLevel: "Advanced", 
    categoryBreakdown: [
      { category: "SQL Fundamentals", score: 100, difficulty: "beginner" },
      { category: "Aggregation & Grouping", score: 100, difficulty: "intermediate" },
      { category: "Filtering & Conditions", score: 100, difficulty: "beginner" },
      { category: "JOINs & Relationships", score: 100, difficulty: "intermediate" },
      { category: "Advanced Analytics", score: 75, difficulty: "advanced" }
    ],
    wrongAnswers: [
      "Advanced Analytics: PIVOT operations for data transformation"
    ]
  }
];

async function testAIFeedback(scenario, serverUrl = 'http://localhost:3002') {
  const prompt = `As an SQL expert and analytics mentor, provide personalized feedback for this assessment:

Score: ${scenario.score}%
Skill Level: ${scenario.skillLevel}
Time Taken: ${Math.floor(scenario.timeElapsed / 60)} minutes

Category Performance:
${scenario.categoryBreakdown.map(cat => `${cat.category}: ${cat.score}% (${cat.difficulty})`).join('\n')}

Areas needing improvement:
${scenario.wrongAnswers.join('\n')}

Please provide:
1. A personalized assessment summary (2-3 sentences)
2. Top 3 specific areas to focus on for improvement
3. Recommended learning path with specific topics
4. Next steps to advance their analytics SQL skills

Keep it encouraging but honest, focusing on practical skills for data analysts.`;

  try {
    console.log(`\n🧪 Testing: ${scenario.name}`);
    console.log(`📊 Score: ${scenario.score}% | ⏱️  Time: ${Math.floor(scenario.timeElapsed / 60)}min | 📈 Level: ${scenario.skillLevel}`);
    console.log('─'.repeat(80));
    
    const response = await fetch(`${serverUrl}/api/ai-feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ AI Feedback Generated:');
      console.log(data.feedback);
      
      // Analyze response quality
      const wordCount = data.feedback.split(' ').length;
      const hasRequiredSections = [
        'Assessment Summary',
        'Priority Focus Areas', 
        'Next Steps',
        'Skill Level'
      ].every(section => data.feedback.includes(section));
      
      console.log(`\n📋 Analysis: ${wordCount} words | Sections: ${hasRequiredSections ? '✅' : '❌'}`);
      
    } else {
      console.log('❌ Error:', data.error);
    }
    
  } catch (error) {
    console.log('❌ Request failed:', error.message);
  }
  
  console.log('═'.repeat(80));
}

async function runTests() {
  console.log('🚀 Starting SQL Assessment AI Feedback Tests');
  
  // Try multiple ports to find the running server
  const ports = [3000, 3001, 3002];
  let serverUrl = null;
  
  for (const port of ports) {
    try {
      const testUrl = `http://localhost:${port}`;
      console.log(`📍 Checking: ${testUrl}`);
      const healthCheck = await fetch(`${testUrl}/api/health`);
      if (healthCheck.ok) {
        serverUrl = testUrl;
        console.log(`✅ Server found at: ${serverUrl}`);
        break;
      }
    } catch (error) {
      // Continue to next port
    }
  }
  
  if (!serverUrl) {
    console.log('❌ Server not available on any port (3000, 3001, 3002)');
    console.log('📍 Make sure to run: npm run dev');
    process.exit(1);
  }

  // Update the test function to use the found server URL
  for (const scenario of scenarios) {
    await testAIFeedback(scenario, serverUrl);
    
    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🎉 All tests completed!');
  console.log('\n💡 Tips for evaluation:');
  console.log('  • Check if responses are under 300 words');
  console.log('  • Verify all required sections are present');
  console.log('  • Ensure feedback is actionable and encouraging');
  console.log('  • Confirm skill level assessment is accurate');
}

// Run the tests
runTests().catch(console.error); 