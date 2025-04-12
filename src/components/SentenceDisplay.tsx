
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
    <div className="text-xl leading-relaxed mb-10">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span 
              className={`
                inline-block min-w-20 border-b-2 mx-1 px-2 text-center
                ${filledAnswers[index] 
                  ? 'border-indigo-500 text-indigo-700 cursor-pointer' 
                  : 'border-gray-300'
                }
              `}
              onClick={() => filledAnswers[index] !== null && onBlankClick(index)}
            >
              {filledAnswers[index] ? (
                <span className="py-1 px-2 inline-block bg-gray-50 rounded-md border border-gray-200">
                  {filledAnswers[index]}
                </span>
              ) : (
                <span className="py-1 inline-block">&nbsp;</span>
              )}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SentenceDisplay;
