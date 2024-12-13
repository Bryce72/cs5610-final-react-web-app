import { QuizQuestion } from "./QuizQuestion";

enum QuizType {
  Graded = "Graded Quiz",
  Practice = "Practice Quiz",
  SurveyGraded = "Graded Survey",
  SurveyUngraded = "Ungraded Survey"
}

enum AssignmentGroup {
  Quizzes = "Quizzes",
  Exams = "Exams",
  Assignments = "Assignments",
  Projects = "Projects"
}

export type Quiz = {
  course: string; //FK to course
  name: string;
  quiz_type: QuizType;
  total_points: number;
  assignment_group: AssignmentGroup;
  shuffle_answers: boolean;
  time_limit_minutes: number;
  multi_attempts: boolean;
  num_attempts: number;
  show_answer: boolean;
  passcode: string; //empty string instead of null now
  questions_one_by_one: boolean;
  webcam_required: boolean;
  lock_questions: boolean;
  due: string | null;
  available_from: string | null;
  available_until: string | null;
  questions: QuizQuestion[];
};

export { QuizType, AssignmentGroup };
