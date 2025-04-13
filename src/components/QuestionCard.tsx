import React, { useState, useEffect } from "react";
import { Question } from "@/types";
import Word from "./Word";
import SentenceDisplay from "./SentenceDisplay";
import Timer from "./Timer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  const parts = question.sentence.split("_____________");;
  const blankCount = parts.length - 1;

  // Initialize filledAnswers with nulls equal to the number of blanks
  const [filledAnswers, setFilledAnswers] = useState<(string | null)[]>(
    Array(blankCount).fill(null)
  );

  // Track available options (we'll remove selected ones)
  const [availableOptions, setAvailableOptions] = useState<string[]>([
    ...question.options,
  ]);

  // Track which blank index each word is placed in
  const [wordPlacement, setWordPlacement] = useState<
    Record<string, number | null>
  >(Object.fromEntries(question.options.map((word) => [word, null])));

  // Track if timer is active
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Reset state when question changes
  useEffect(() => {
    setFilledAnswers(Array(blankCount).fill(null));
    setAvailableOptions([...question.options]);
    setWordPlacement(
      Object.fromEntries(question.options.map((word) => [word, null]))
    );
    setIsTimerActive(true);
  }, [question, blankCount]);

  // Handle clicking on a word option
  const handleWordClick = (word: string) => {
    // Find the first empty blank
    const emptyIndex = filledAnswers.findIndex((answer) => answer === null);

    if (emptyIndex !== -1) {
      // Create a copy of the arrays to update
      const newFilledAnswers = [...filledAnswers];

      // Set the word in the first empty blank
      newFilledAnswers[emptyIndex] = word;

      // Update word placement
      setWordPlacement((prev) => ({
        ...prev,
        [word]: emptyIndex,
      }));

      // Remove word from available options
      setAvailableOptions((prev) => prev.filter((option) => option !== word));

      setFilledAnswers(newFilledAnswers);
    }
  };

  // Handle clicking on a filled blank
  const handleBlankClick = (blankIndex: number) => {
    // If blank is empty, do nothing
    if (filledAnswers[blankIndex] === null) return;

    // Get the word in the blank
    const word = filledAnswers[blankIndex];

    if (word) {
      // Create a copy of the arrays to update
      const newFilledAnswers = [...filledAnswers];

      // Clear the blank
      newFilledAnswers[blankIndex] = null;

      // Add the word back to available options
      setAvailableOptions((prev) => [...prev, word]);

      // Update word placement
      setWordPlacement((prev) => ({
        ...prev,
        [word]: null,
      }));

      setFilledAnswers(newFilledAnswers);
    }
  };

  // Check if all blanks are filled
  const allBlanksFilled = filledAnswers.every(
    (answer) => typeof answer === "string" && answer.trim().length > 0
  );

  // Handle timer completion
  const handleTimeUp = () => {
    setIsTimerActive(false);
    // If all blanks aren't filled, auto-submit whatever is filled
    const answers = filledAnswers.map((answer) => answer || "");
    onSubmit(answers);
  };

  // Handle next button click
  const handleNext = () => {
    setIsTimerActive(false);
    // Convert null values to empty strings to avoid issues
    const answers = filledAnswers.map((answer) => answer || "");
    onSubmit(answers);
  };

  // Create a progress indicator showing which question we're on
  const progressIndicators = Array(totalQuestions)
    .fill(0)
    .map((_, index) => {
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
        <Timer duration={30} onTimeUp={handleTimeUp} isActive={isTimerActive} />

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
              status === "completed"
                ? "bg-amber-500"
                : status === "current"
                ? "bg-amber-500"
                : "bg-gray-200"
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
        {availableOptions.map((word, index) => (
          <Word
            key={word}
            word={word}
            isSelected={false}
            onClick={() => handleWordClick(word)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!allBlanksFilled}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white rounded aspect-square p-0 h-12 w-12 flex items-center justify-center  disabled:opacity-50 disabled:cursor-not`}
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
