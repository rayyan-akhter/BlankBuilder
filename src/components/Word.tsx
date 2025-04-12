
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
      className={`word-option transition-all ${isSelected ? 'word-option-selected opacity-50' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {word}
    </div>
  );
};

export default Word;
