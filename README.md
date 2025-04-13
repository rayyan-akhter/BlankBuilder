
# Word Flow Builder - Sentence Construction Quiz

## Project Overview

Word Flow Builder is an interactive educational application designed to help users improve their language skills through sentence construction exercises. Users are presented with incomplete sentences and must select the correct words from provided options to fill in the blanks, enhancing vocabulary, grammar, and language comprehension.

## Live Demo

**URL**: https://lovable.dev/projects/8dd1bde9-9b6a-41ab-8b6b-c16ad9591038

## Features

### 1. Interactive Quiz Format
- 10 carefully crafted questions that test sentence construction skills
- Multiple blanks per sentence that must be filled with the correct words
- Drag-and-drop word selection for an intuitive user experience

### 2. User-Friendly Interface
- Clean, modern design with intuitive navigation
- Progress tracking to show users their position in the quiz
- 30-second timer per question to encourage quick thinking

### 3. Immediate Feedback
- Visual indication of correct and incorrect answers
- Detailed results screen showing performance on each question
- Comparison between user answers and correct answers for learning purposes

### 4. Responsive Design
- Works seamlessly across desktop, tablet, and mobile devices
- Optimized layouts for different screen sizes

## How to Play

1. **Start Screen**: Begin the quiz by clicking the "Start" button on the homepage.
2. **Questions**: For each question, you'll see:
   - A sentence with blanks (represented by underlines)
   - A set of word options to choose from
   - A timer counting down from 30 seconds

3. **Answer Process**:
   - Click on a word to place it in the next available blank
   - Click on a filled blank to remove the word if you want to change your answer
   - All blanks must be filled before proceeding to the next question
   - The "Next" button moves you to the next question

4. **Results**: After completing all questions, you'll see:
   - Your overall score
   - A breakdown of each question with your answers
   - For incorrect answers, you'll see both your answer and the correct answer

## Technical Implementation

The application is built with:

- **React**: For building the user interface and managing components
- **TypeScript**: For type-safe code and better developer experience
- **Tailwind CSS**: For responsive styling and design
- **shadcn/ui**: For UI components and consistent design language
- **React Router**: For navigation between different screens

### Key Components:

- **StartScreen**: Introduces the quiz and provides starting instructions
- **QuestionCard**: Displays the current question with options and timer
- **SentenceDisplay**: Renders the sentence with blanks for user input
- **Word**: Individual word options that can be selected
- **ResultsScreen**: Shows performance feedback after quiz completion
- **Timer**: Countdown visualization for each question

### Data Management:

- Questions are stored in a structured format with:
  - Unique identifiers
  - Sentences with placeholders
  - Available options
  - Correct answers in the proper order
- User progress and answers are tracked throughout the quiz

## Development Setup

Follow these steps to set up the project locally:

```sh
# Clone the repository
git clone <REPOSITORY_URL>

# Navigate to the project directory
cd word-flow-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Customization

The quiz can be customized by modifying the question data in `src/hooks/useQuestions.ts`. Each question follows this structure:

```typescript
{
  questionId: "unique-id",
  question: "The _______ cat _______ on the mat.",
  questionType: "text",
  answerType: "options",
  options: ["black", "sat", "jumped", "slept"],
  correctAnswer: ["black", "sat"]
}
```

## Deployment

This project is deployed using Lovable's hosting service. You can deploy your own version by following these steps:

1. Open the project in [Lovable](https://lovable.dev/projects/8dd1bde9-9b6a-41ab-8b6b-c16ad9591038)
2. Click on Share -> Publish
3. Your application will be available at the provided URL

## Custom Domain

To connect a custom domain to your Lovable project:
1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the step-by-step guide in the [Lovable documentation](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Contributing

Contributions to improve the application are welcome. Please feel free to submit pull requests or open issues to suggest enhancements or report bugs.

## License

This project is available for use under standard licensing terms.

---

Created with [Lovable](https://lovable.dev) - AI-powered web application development.
