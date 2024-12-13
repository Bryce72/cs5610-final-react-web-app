export enum QuestionType {
    TrueFalse = "true-false",
    MultipleChoice = "multiple-choice",
    FillBlanks = "fill-blanks"
}

export interface QuizQuestion {
    _id: string; //PK
    quiz: string; //FK
    title: string;
    type: QuestionType;
    points: number;
    prompt: string;
    choices: string[] | boolean[];
    solution: string | string[] | boolean;
}