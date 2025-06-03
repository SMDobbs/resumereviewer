# OpenAI Resume Reviewer Setup

## Environment Variables

To use the AI Resume Reviewer feature, you need to add your OpenAI API key to your environment variables.

### Setup Instructions

1. **Get your OpenAI API Key**
   - Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Create a new API key or use an existing one

2. **Add to Environment Variables**
   - Create or update your `.env.local` file in the root directory
   - Add the following line:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Restart Development Server**
   - After adding the API key, restart your development server:
   ```bash
   npm run dev
   ```

## Features

The Resume Reviewer includes:

- **PDF and Text File Support**: Upload resumes in PDF or TXT format
- **Drag & Drop Interface**: Easy file upload with visual feedback
- **Customizable Review Criteria**: Tailor the analysis to specific requirements
- **Comprehensive Analysis**: 
  - Overall score (1-10)
  - Content and formatting scores
  - Strengths and weaknesses
  - Actionable recommendations
  - ATS optimization feedback
- **GPT-4 Mini Integration**: Fast and cost-effective AI analysis

## Usage

1. Navigate to `/resume-reviewer` or click the "Try Resume Reviewer" button on the Resources page
2. Upload your resume (PDF or TXT)
3. Enter the job description or criteria you're targeting
4. Customize the review prompt if needed
5. Click "Analyze Resume" to get detailed feedback

## API Costs

The feature uses OpenAI's GPT-4 Mini model, which is cost-effective:
- Approximately $0.00015 per 1K input tokens
- Approximately $0.0006 per 1K output tokens
- Typical resume analysis costs less than $0.01

## Security

- API keys are stored securely in environment variables
- Resume content is sent to OpenAI for analysis but not stored
- No resume data is saved on your servers 