
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
  const parts = sentence.split('_____________');

  return (
    <div className="text-xl leading-relaxed mb-10 px-6">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span 
              className={`
                inline-block min-w-24 border-b-2 mx-1 px-2 text-center
                ${filledAnswers[index] 
                  ? 'border-gray-300' 
                  : 'border-gray-300'
                }
              `}
              onClick={() => filledAnswers[index] !== null && onBlankClick(index)}
            >
              {filledAnswers[index] ? (
                <span className=" mb-2 inline-block rounded-md border text-sm  border-gray-200  py-2 px-4  text-center">
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
