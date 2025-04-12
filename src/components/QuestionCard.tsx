
import React, { useState, useEffect } from 'react';
import { Question } from '@/types';
import Word from './Word';
import SentenceDisplay from './SentenceDisplay';
import Timer from './Timer';
import { Button } from '@/components/ui/button';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answers: string[]) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
}) => {
  // Count how many blanks are in the sentence
  const blankCount = (question.sentence.match(/___/g) || []).length;
  
  // Initialize filledAnswers with nulls equal to the number of blanks
  const [filledAnswers, setFilledAnswers] = useState<(string | null)[]>(
    Array(blankCount).fill(null)
  );
  
  // Track which options have been selected
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(
    Array(question.options.length).fill(false)
  );

  // Reset state when question changes
  useEffect(() => {
    setFilledAnswers(Array(blankCount).fill(null));
    setSelectedOptions(Array(question.options.length).fill(false));
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
    // If all blanks aren't filled, auto-submit whatever is filled
    if (!allBlanksFilled) {
      onSubmit(filledAnswers.map(answer => answer || ""));
    }
  };

  // Handle next button click
  const handleNext = () => {
    // Convert null values to empty strings to avoid issues
    const answers = filledAnswers.map(answer => answer || "");
    onSubmit(answers);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {questionNumber} of {totalQuestions}
        </h2>
      </div>
      
      <Timer 
        duration={30} 
        onTimeUp={handleTimeUp} 
        isActive={true}
      />
      
      <SentenceDisplay 
        sentence={question.sentence}
        filledAnswers={filledAnswers}
        onBlankClick={handleBlankClick}
      />
      
      <div className="grid grid-cols-2 gap-4 mb-8">
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
          disabled={!allBlanksFilled}
          className="bg-blue hover:bg-blue-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
