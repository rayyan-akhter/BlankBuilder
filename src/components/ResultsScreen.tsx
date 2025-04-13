import React from "react";
import { Answer, Question } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const correctAnswers = answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return false;

    // Compare both arrays as strings (order matters)
    return (
      JSON.stringify(answer.userAnswers) ===
      JSON.stringify(question.correctAnswers)
    );
  }).length;

  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const coinsEarned = correctAnswers * 5;

  const handleGoToDashboard = () => {
    navigate("/", { state: { coins: correctAnswers * 5 } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-12 px-4 bg-gray-50">
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-between mb-8">
          <button
            className="flex items-center text-gray-500 hover:text-gray-700"
            onClick={() =>
              navigate("/", { state: { coins: correctAnswers * 5 } })
            }
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-medium text-center flex-1">
            Sentence Construction
          </h1>
          <div className="w-16"></div> {/* Placeholder for alignment */}
        </header>

        <div className=" rounded-xl  p-8 mb-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">
                  {scorePercentage}
                </span>
                <span className="text-lg font-medium text-gray-500 ml-1">
                  %
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-center max-w-md mb-6">
              {scorePercentage >= 80
                ? "While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details."
                : scorePercentage >= 60
                ? "Good job! While you correctly formed several sentences, there are a few areas where improvement is needed. Review your responses below."
                : "While you made some progress, there are several areas where improvement is needed. Pay close attention to sentence structure and word placement."}
            </p>

            <p className="text-lg font-medium mt-2 text-yellow-600 mb-3">
              🪙 You earned <span className="font-bold">{coinsEarned}</span>{" "}
              coins!
            </p>

            <Button
              onClick={handleGoToDashboard}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Dashboard
            </Button>
          </div>

          <div className="space-y-8">
            {questions.map((question, index) => {
              const answer = answers.find((a) => a.questionId === question.id);

              // If there's no answer (should not happen, but just in case)
              if (!answer) return null;

              return (
                <div key={question.id} className="border-t p-6 bg-white rounded-xl shadow-md  ">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-gray-500">Question {index + 1}</h3>
                    <div className="text-sm px-2 py-0.5 rounded-full flex items-center">
                      <span
                        className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                          JSON.stringify(answer.userAnswers) ===
                          JSON.stringify(question.correctAnswers)
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {JSON.stringify(answer.userAnswers) ===
                        JSON.stringify(question.correctAnswers)
                          ? "Correct"
                          : "Incorrect"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-gray-500 mb-1">Your response:</div>
                    <p className="text-gray-800">
                      {getSentenceWithAnswers(
                        question.sentence,
                        answer.userAnswers
                      )}
                    </p>
                  </div>

                  {JSON.stringify(answer.userAnswers) !==
                    JSON.stringify(question.correctAnswers) && (
                    <div>
                      <div className="text-gray-500 mb-1">Correct answer:</div>
                      <p className="text-gray-800">
                        {getSentenceWithAnswers(
                          question.sentence,
                          question.correctAnswers
                        )}
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

// Helper to render sentence with highlighted answers
const getSentenceWithAnswers = (sentence: string, userAnswers: string[]) => {
  const parts = sentence.split("_____________");
  let result = "";

  parts.forEach((part, index) => {
    result += part;

    if (index < parts.length - 1) {
      const userAnswer = userAnswers[index] || "";

      if (userAnswer) {
        result += userAnswer;
      } else {
        result += "_______";
      }
    }
  });

  return result;
};

export default ResultsScreen;
