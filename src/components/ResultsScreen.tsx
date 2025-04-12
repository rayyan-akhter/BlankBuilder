
import React from 'react';
import { Answer, Question } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  // Calculate the score
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const handleGoToDashboard = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-12 px-4 bg-gray-50">
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-between mb-8">
          <button 
            className="flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
          
          <h1 className="text-xl font-medium text-center flex-1">Sentence Construction</h1>
          
          <div className="w-16"></div> {/* Placeholder for alignment */}
        </header>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{scorePercentage}</span>
                <span className="text-lg font-medium text-gray-500 ml-1">%</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-center max-w-md mb-6">
              While you correctly formed several sentences, there are a couple of areas where
              improvement is needed. Pay close attention to sentence structure and word placement
              to ensure clarity and correctness. Review your responses below for more details.
            </p>
            
            <Button 
              onClick={handleGoToDashboard}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>
          
          <div className="space-y-8">
            {questions.map((question, index) => {
              const answer = answers.find(a => a.questionId === question.id);
              
              // If there's no answer (should not happen, but just in case)
              if (!answer) return null;
              
              return (
                <div key={question.id} className="border-t pt-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-gray-500">Prompt</h3>
                    <span className="text-gray-500 text-sm">{index + 1}/{totalQuestions}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-4">
                    {getSentenceWithBlanks(question.sentence)}
                  </p>
                  
                  <div className="mb-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Your response:</span>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                        answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {answer.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="text-gray-800">
                      {getSentenceWithAnswers(question.sentence, answer.userAnswers)}
                    </p>
                  </div>
                  
                  {!answer.isCorrect && (
                    <div>
                      <div className="text-gray-500">Correct:</div>
                      <p className="text-gray-800">
                        {getSentenceWithAnswers(question.sentence, question.correctAnswers)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to render sentence with highlighted blanks
const getSentenceWithBlanks = (sentence: string) => {
  const parts = sentence.split('___');
  let result = '';
  
  parts.forEach((part, index) => {
    result += part;
    
    if (index < parts.length - 1) {
      result += '_______';
    }
  });
  
  return result;
};

// Helper to render sentence with highlighted answers
const getSentenceWithAnswers = (
  sentence: string, 
  userAnswers: string[]
) => {
  const parts = sentence.split('___');
  let result = '';
  
  parts.forEach((part, index) => {
    result += part;
    
    if (index < parts.length - 1) {
      const userAnswer = userAnswers[index] || '';
      
      if (userAnswer) {
        result += userAnswer;
      } else {
        result += '_______';
      }
    }
  });
  
  return result;
};

export default ResultsScreen;
