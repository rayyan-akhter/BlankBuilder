
import { useState, useEffect } from 'react';
import { Question, Answer, QuestionState } from '@/types';
import { mockQuestions } from '@/data/questions';

// In a real application, this would be fetched from an API
const fetchQuestions = async (): Promise<Question[]> => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockQuestions;
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
