export interface QuizAttempt {
    quiz_id: string;
    user_id: string;
    score: number;
    answers: Answer[];
}

export interface Answer{
    question_id: string;
    answer: string | string[] | boolean;
    points_earned: number;
}