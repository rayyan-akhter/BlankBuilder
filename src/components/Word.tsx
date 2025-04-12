
import React from 'react';

interface WordProps {
  word: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Word: React.FC<WordProps> = ({ word, isSelected, onClick, disabled = false }) => {
  return (
    <div 
      className={`
        transition-all border py-2 px-4 rounded-md text-center cursor-pointer
        ${isSelected 
          ? 'border-gray-200 bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed' 
          : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={disabled ? undefined : onClick}
    >
      {word}
    </div>
  );
};

export default Word;
