
import React from 'react';
import { useQuestions } from '@/hooks/useQuestions';
import QuestionCard from '@/components/QuestionCard';
import ResultsScreen from '@/components/ResultsScreen';
import { useNavigate } from 'react-router-dom';

const QuestionsPage = () => {
  const navigate = useNavigate();
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    isLoading,
    error,
    isFinished,
    submitAnswer,
    resetQuiz,
  } = useQuestions();

  const handleQuit = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-3xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {isFinished ? (
        <ResultsScreen 
          answers={answers}
          questions={answers.map(answer => {
            // Find the corresponding question for this answer
            const foundQuestion = Array.isArray(currentQuestion) 
              ? currentQuestion.find(q => q.id === answer.questionId)
              : null;
              
            const question = foundQuestion || {
              id: answer.questionId,
              sentence: "",
              options: [],
              correctAnswers: [],
            };
            
            return question;
          })}
          onRestart={resetQuiz}
        />
      ) : (
        currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            onSubmit={submitAnswer}
            onQuit={handleQuit}
          />
        )
      )}
    </div>
  );
};

export default QuestionsPage;
