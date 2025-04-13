import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { useLocation } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const coins = location.state?.coins || 0;

  const handleStart = () => {
    navigate("/questions");
  };

  const handleBack = () => {
    // In a real app, this might navigate to a dashboard or previous page
    console.log("Back button clicked");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 pt-0">
      <div className="max-w-3xl w-full p-8 pt-0 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-gray-500" />
        </div>

        <h1 className="text-[2.5rem]  text-center mb-3 ">
          Sentence Construction
        </h1>

        <p className="text-center text-gray-600 mb-12 max-w-md">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-lg">
          <div className="bg-gray-50 p-4 text-center border-r-2 flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Time Per Question
            </h3>
            <p className="text-lg font-medium">30 sec</p>
          </div>

          <div className="bg-gray-50 p-4 text-center border-r-2 flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Total Questions
            </h3>
            <p className="text-lg font-medium">10</p>
          </div>

          <div className="bg-gray-50 p-4 text-center border-r-2 flex flex-col gap-3">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Coins</h3>
            <p className="text-lg font-medium flex items-center justify-center">
              <span className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded-full inline-block mr-1 animate-flipCoin"></span>{" "}
              {coins}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="px-8" onClick={handleBack}>
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
