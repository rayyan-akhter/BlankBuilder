
export interface Question {
  id: number;
  sentence: string;
  options: string[];
  correctAnswers: string[];
}

export interface Answer {
  questionId: number;
  userAnswers: string[];
  isCorrect: boolean;
}

export interface QuestionState {
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
  isLoading: boolean;
  error: string | null;
}
