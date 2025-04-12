
import React from 'react';
import { useQuestions } from '@/hooks/useQuestions';
import QuestionCard from '@/components/QuestionCard';
import ResultsScreen from '@/components/ResultsScreen';

const Index = () => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-lightest">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-dark">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-lightest">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-dark mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-lightest p-4">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sentence Construction</h1>
        <p className="text-gray-dark">Fill in the blanks with the correct words</p>
      </header>

      {isFinished ? (
        <ResultsScreen 
          answers={answers}
          questions={answers.map(answer => {
            return {
              id: answer.questionId,
              sentence: currentQuestion?.sentence || "",
              options: currentQuestion?.options || [],
              correctAnswers: currentQuestion?.correctAnswers || [],
            };
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
          />
        )
      )}
    </div>
  );
};

export default Index;
