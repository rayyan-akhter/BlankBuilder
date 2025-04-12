
import { useState, useEffect } from 'react';
import { Question, Answer, QuestionState } from '@/types';

// The new sample data format from the provided JSON
const sampleData = {
  "status": "SUCCESS",
  "data": {
    "testId": "oihq2eo9h1029921-210-20112",
    "questions": [
      {
        "questionId": "b28af948-db8b-465e-92e6-3d42534c4533",
        "question": "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
        "correctAnswer": ["User-centric", "Incorporated", "Enhancing", "Cultivating"]
      },
      {
        "questionId": "6e6534ea-260a-4c26-96fd-f830b27601fb",
        "question": "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Captivating", "Eclectic", "Garnering", "Blended"],
        "correctAnswer": ["Eclectic", "Blended", "Captivating", "Garnering"]
      },
      {
        "questionId": "7186e3da-0384-460a-af19-5a3984758e78",
        "question": "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Pioneering", "Paving", "Overcoming", "Opened up"],
        "correctAnswer": ["Pioneering", "Opened up", "Overcoming", "Paving"]
      },
      {
        "questionId": "10cbe3c2-13bb-4973-a794-18bf309b0791",
        "question": "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Improving", "Reducing", "Enabled", "Revolutionary"],
        "correctAnswer": ["Revolutionary", "Enabled", "Improving", "Reducing"]
      },
      {
        "questionId": "71ffe41e-8732-48e6-87f2-f84ea07eb060",
        "question": "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Raising", "Massive", "Prompting", "Compromised"],
        "correctAnswer": ["Massive", "Compromised", "Raising", "Prompting"]
      },
      {
        "questionId": "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
        "question": "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
        "correctAnswer": ["Comprehensive", "Implemented", "Promoting", "Enhancing"]
      },
      {
        "questionId": "ed5e6e2d-8408-406e-be32-777ac26460e2",
        "question": "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Implemented", "Setting", "Unwavering", "Reducing"],
        "correctAnswer": ["Unwavering", "Implemented", "Reducing", "Setting"]
      },
      {
        "questionId": "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
        "question": "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Opening", "Improved", "Gradual", "Reducing"],
        "correctAnswer": ["Gradual", "Improved", "Reducing", "Opening"]
      },
      {
        "questionId": "d78effdf-88ab-4667-8115-3bfb2baa0a24",
        "question": "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Providing", "Brought together", "Promoting", "International"],
        "correctAnswer": ["International", "Brought together", "Promoting", "Providing"]
      },
      {
        "questionId": "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
        "question": "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Enhancing", "Improved", "Providing", "Widespread"],
        "correctAnswer": ["Widespread", "Improved", "Enhancing", "Providing"]
      }
    ]
  },
  "message": "Questions fetched successfully"
};

// Convert the API data format to our application format
const convertApiQuestionsToAppFormat = (apiQuestions: any[]): Question[] => {
  return apiQuestions.map((q, index) => ({
    id: index + 1, // Using index+1 as id for simplicity
    sentence: q.question,
    options: q.options,
    correctAnswers: q.correctAnswer,
  }));
};

// In a real application, this would be fetched from an API
const fetchQuestions = async (): Promise<Question[]> => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Convert the API format to our application format
  return convertApiQuestionsToAppFormat(sampleData.data.questions);
};

export const useQuestions = () => {
  const [state, setState] = useState<QuestionState>({
    currentQuestionIndex: 0,
    questions: [],
    answers: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions();
        setState(prev => ({
          ...prev,
          questions,
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to load questions. Please try again.',
          isLoading: false,
        }));
      }
    };

    loadQuestions();
  }, []);

  const submitAnswer = (userAnswers: string[]) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    
    // Check if all answers are correct
    const isCorrect = userAnswers.every((answer, index) => 
      answer === currentQuestion.correctAnswers[index]
    );

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      userAnswers,
      isCorrect,
    };

    setState(prev => ({
      ...prev,
      answers: [...prev.answers, newAnswer],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  const resetQuiz = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: [],
    }));
  };

  return {
    currentQuestion: state.questions[state.currentQuestionIndex],
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions: state.questions.length,
    answers: state.answers,
    isLoading: state.isLoading,
    error: state.error,
    isFinished: state.currentQuestionIndex >= state.questions.length && state.questions.length > 0,
    submitAnswer,
    resetQuiz,
  };
};
