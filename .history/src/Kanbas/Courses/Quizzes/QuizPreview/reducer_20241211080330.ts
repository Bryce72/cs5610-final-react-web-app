// reducer.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

// Async thunk for fetching questions
export const fetchQuestions = createAsyncThunk(
  "quizPreview/fetchQuestions",
  async (quizId?: string) => {
    if (quizId) {
      return await client.findQuizQuestions(quizId);
    }
    return await client.findAllQuestions();
  }
);

// Types
interface Question {
  _id: string;
  type: "fill-blanks" | "true-false" | "multiple-choice";
  question: string;
  points: number;
  choices: any[];
  solution: any;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: any[];
  feedback: { [key: number]: boolean };
  currentPoints: number;
  totalPoints: number;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  feedback: {},
  currentPoints: 0,
  totalPoints: 0,
  loading: false,
  error: null,
};

const quizPreviewSlice = createSlice({
  name: "quizPreview",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;

      // Check if answer is correct based on question type
      const question = state.questions[questionIndex];
      let isCorrect = false;

      switch (question.type) {
        case "fill-blanks":
          // For fill-blanks, check if answer matches any of the solutions
          isCorrect = Array.isArray(question.solution)
            ? question.solution.includes(answer)
            : question.solution === answer;
          break;

        case "true-false":
          // For true-false, convert string to boolean if needed
          const boolAnswer =
            typeof answer === "string"
              ? answer.toLowerCase() === "true"
              : answer;
          isCorrect = boolAnswer === question.solution;
          break;

        case "multiple-choice":
        default:
          // For multiple choice, direct comparison
          isCorrect = answer === question.solution;
          break;
      }

      // Update feedback and points
      state.feedback[questionIndex] = isCorrect;
      state.currentPoints = Object.entries(state.feedback).reduce(
        (total, [idx, correct]) => {
          return total + (correct ? state.questions[Number(idx)].points : 0);
        },
        0
      );
    },
    setQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = new Array(state.questions.length).fill(null);
      state.feedback = {};
      state.currentPoints = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        state.selectedAnswers = new Array(action.payload.length).fill(null);
        state.totalPoints = action.payload.reduce(
          (sum, q) => sum + q.points,
          0
        );
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch questions";
      });
  },
});

export const {
  nextQuestion,
  prevQuestion,
  selectAnswer,
  setQuestionIndex,
  resetQuiz,
} = quizPreviewSlice.actions;

// Selectors
export const selectCurrentQuestion = (state: { quizPreview: QuizState }) => {
  const { questions, currentQuestionIndex } = state.quizPreview;
  return questions[currentQuestionIndex];
};

export const selectQuizProgress = (state: { quizPreview: QuizState }) => {
  const { currentPoints, totalPoints, feedback } = state.quizPreview;
  const percentage = totalPoints
    ? ((currentPoints / totalPoints) * 100).toFixed(1)
    : "0";
  return { currentPoints, totalPoints, percentage };
};

export default quizPreviewSlice.reducer;
