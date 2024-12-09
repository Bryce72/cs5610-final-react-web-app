export enum QuestionType {
    TrueFalse = "true-false",
    MultipleChoice = "multiple-choice",
    FillBlanks = "fill-blanks"
}

export interface QuizQuestion {
    question_id: string; //PK
    quiz_id: string; //FK
    title: string;
    type: QuestionType;
    points: number;
    question: string;
    choices: string[] | boolean[];
    solution: string | string[] | boolean;
}