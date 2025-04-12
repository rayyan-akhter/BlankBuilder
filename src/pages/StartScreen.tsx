
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const StartScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/questions');
  };

  const handleBack = () => {
    // In a real app, this might navigate to a dashboard or previous page
    console.log('Back button clicked');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-gray-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-3">Sentence Construction</h1>
        
        <p className="text-center text-gray-600 mb-12 max-w-md">
          Select the correct words to complete the sentence by arranging
          the provided options in the right order.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-lg">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Time Per Question</h3>
            <p className="text-lg font-medium">30 sec</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Questions</h3>
            <p className="text-lg font-medium">10</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Coins</h3>
            <p className="text-lg font-medium flex items-center justify-center">
              <span className="w-4 h-4 bg-yellow-400 rounded-full inline-block mr-1"></span> 0
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="px-8" 
            onClick={handleBack}
          >
            Back
          </Button>
          
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 px-8" 
            onClick={handleStart}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
