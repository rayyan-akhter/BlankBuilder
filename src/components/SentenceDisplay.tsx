
import React from 'react';

interface SentenceDisplayProps {
  sentence: string;
  filledAnswers: (string | null)[];
  onBlankClick: (index: number) => void;
}

const SentenceDisplay: React.FC<SentenceDisplayProps> = ({
  sentence,
  filledAnswers,
  onBlankClick,
}) => {
  // Split the sentence by blank placeholders (___)
  const parts = sentence.split('___');

  return (
    <div className="text-xl leading-relaxed mb-10 text-center">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span 
              className={`word-blank ${filledAnswers[index] ? 'word-blank-filled' : ''}`}
              onClick={() => filledAnswers[index] !== null && onBlankClick(index)}
            >
              {filledAnswers[index] || ''}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SentenceDisplay;
