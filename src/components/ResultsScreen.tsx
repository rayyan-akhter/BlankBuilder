
import React from 'react';
import { Answer, Question } from '@/types';
import { Button } from '@/components/ui/button';

interface ResultsScreenProps {
  answers: Answer[];
  questions: Question[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  answers,
  questions,
  onRestart,
}) => {
  // Calculate the score
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Your Results</h1>
      
      <div className="flex flex-col items-center mb-8 p-6 bg-gray-lightest rounded-lg">
        <div className="text-5xl font-bold text-blue mb-2">
          {correctAnswers}/{totalQuestions}
        </div>
        <p className="text-lg text-gray-dark">
          You scored {scorePercentage}%
        </p>
      </div>
      
      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold border-b pb-2">Answers Review</h2>
        
        {questions.map((question, index) => {
          const answer = answers.find(a => a.questionId === question.id);
          
          // If there's no answer (should not happen, but just in case)
          if (!answer) return null;
          
          return (
            <div 
              key={question.id}
              className={`p-4 rounded-lg ${
                answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Question {index + 1}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  answer.isCorrect 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {answer.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">
                {getSentenceWithAnswers(question.sentence, answer.userAnswers, question.correctAnswers)}
              </p>
              
              {!answer.isCorrect && (
                <div className="mt-2 pt-2 border-t border-red-100">
                  <p className="text-sm font-medium text-gray-600">Correct Answer:</p>
                  <p className="text-gray-800">
                    {getSentenceWithAnswers(question.sentence, question.correctAnswers, question.correctAnswers)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onRestart}
          className="bg-blue hover:bg-blue-dark text-white font-medium py-2 px-8 rounded-lg transition-colors"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

// Helper to render sentence with highlighted answers
const getSentenceWithAnswers = (
  sentence: string, 
  userAnswers: string[], 
  correctAnswers: string[]
) => {
  const parts = sentence.split('___');
  let result = '';
  
  parts.forEach((part, index) => {
    result += part;
    
    if (index < parts.length - 1) {
      const userAnswer = userAnswers[index] || '';
      const correctAnswer = correctAnswers[index];
      const isCorrect = userAnswer === correctAnswer;
      
      if (userAnswer) {
        const color = isCorrect ? 'text-green-600' : 'text-red-600';
        result += `<span class="${color} font-medium">${userAnswer}</span>`;
      } else {
        result += '___';
      }
    }
  });
  
  return (
    <span dangerouslySetInnerHTML={{ __html: result }} />
  );
};

export default ResultsScreen;
