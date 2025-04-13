
import React, { useState, useEffect } from 'react';
import { Question } from '@/types';
import Word from './Word';
import SentenceDisplay from './SentenceDisplay';
import Timer from './Timer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answers: string[]) => void;
  onQuit?: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  onQuit,
}) => {
  // Split the sentence by blank placeholders (___)
  const parts = question.sentence.split('___');
  const blankCount = parts.length - 1;
  
  // Initialize filledAnswers with nulls equal to the number of blanks
  const [filledAnswers, setFilledAnswers] = useState<(string | null)[]>(
    Array(blankCount).fill(null)
  );
  
  // Track which options have been selected
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(
    Array(question.options.length).fill(false)
  );
  
  // Track if timer is active
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Reset state when question changes
  useEffect(() => {
    setFilledAnswers(Array(blankCount).fill(null));
    setSelectedOptions(Array(question.options.length).fill(false));
    setIsTimerActive(true);
  }, [question, blankCount]);

  // Handle clicking on a word option
  const handleWordClick = (word: string, optionIndex: number) => {
    // If already selected, do nothing
    if (selectedOptions[optionIndex]) return;
    
    // Find the first empty blank
    const emptyIndex = filledAnswers.findIndex(answer => answer === null);
    
    if (emptyIndex !== -1) {
      // Create a copy of the arrays to update
      const newFilledAnswers = [...filledAnswers];
      const newSelectedOptions = [...selectedOptions];
      
      // Set the word in the first empty blank
      newFilledAnswers[emptyIndex] = word;
      
      // Mark this option as selected
      newSelectedOptions[optionIndex] = true;
      
      setFilledAnswers(newFilledAnswers);
      setSelectedOptions(newSelectedOptions);
    }
  };

  // Handle clicking on a filled blank
  const handleBlankClick = (blankIndex: number) => {
    // If blank is empty, do nothing
    if (filledAnswers[blankIndex] === null) return;
    
    // Find the option index for this word
    const optionIndex = question.options.findIndex(
      option => option === filledAnswers[blankIndex]
    );
    
    // Create a copy of the arrays to update
    const newFilledAnswers = [...filledAnswers];
    const newSelectedOptions = [...selectedOptions];
    
    // Clear the blank
    newFilledAnswers[blankIndex] = null;
    
    // Mark the option as unselected if we found it
    if (optionIndex !== -1) {
      newSelectedOptions[optionIndex] = false;
    }
    
    setFilledAnswers(newFilledAnswers);
    setSelectedOptions(newSelectedOptions);
  };

  // Check if all blanks are filled
  const allBlanksFilled = filledAnswers.every(answer => answer !== null);

  // Handle timer completion
  const handleTimeUp = () => {
    setIsTimerActive(false);
    // If all blanks aren't filled, auto-submit whatever is filled
    const answers = filledAnswers.map(answer => answer || "");
    onSubmit(answers);
  };

  // Handle next button click
  const handleNext = () => {
    setIsTimerActive(false);
    // Convert null values to empty strings to avoid issues
    const answers = filledAnswers.map(answer => answer || "");
    onSubmit(answers);
  };

  // Create a progress indicator showing which question we're on
  const progressIndicators = Array(totalQuestions).fill(0).map((_, index) => {
    if (index < questionNumber - 1) {
      return "completed"; // Questions before current
    } else if (index === questionNumber - 1) {
      return "current"; // Current question
    }
    return "upcoming"; // Questions after current
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Timer 
          duration={30} 
          onTimeUp={handleTimeUp}
          isActive={isTimerActive}
        />
        
        <Button 
          variant="outline"
          size="sm"
          onClick={onQuit}
          className="text-gray-600"
        >
          Quit
        </Button>
      </div>
      
      {/* Progress bar */}
      <div className="flex gap-1 mb-6">
        {progressIndicators.map((status, index) => (
          <div 
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              status === 'completed' ? 'bg-amber-500' : 
              status === 'current' ? 'bg-amber-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      
      <h2 className="text-gray-600 text-center mb-6">
        Fill in the blanks with the correct words
      </h2>
      
      <SentenceDisplay 
        sentence={question.sentence}
        filledAnswers={filledAnswers}
        onBlankClick={handleBlankClick}
      />
      
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {question.options.map((word, index) => (
          <Word
            key={index}
            word={word}
            isSelected={selectedOptions[index]}
            onClick={() => handleWordClick(word, index)}
          />
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <span className="mr-2">Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
