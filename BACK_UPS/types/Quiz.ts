import { QuizQuestion } from "./QuizQuestion";

enum QuizType {
  Graded,
  Practice,
  SurveyGraded,
  SurveyUngraded,
}

enum AssignmentGroup {
  Quizzes,
  Exams,
  Assignments,
  Projects,
}

export type Quiz = {
  quiz_id: string; //use timestamp?
  name: string;
  quiz_type: QuizType;
  total_points: number;
  assignment_group: AssignmentGroup;
  shuffle_answers: boolean;
  time_limit_minutes: number;
  multi_attempts: boolean;
  show_answer: boolean;
  passcode: string | null;
  questions_one_by_one: boolean;
  webcam_required: boolean;
  lock_questions: boolean;
  due: string | null;
  available_from: string | null;
  available_until: string | null;
  questions: QuizQuestion[];
};

export { QuizType, AssignmentGroup };
