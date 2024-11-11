//TODO: make some enums?
type Quiz = {
    name: string;
    quiz_type: string; //ex: graded quiz
    assignment_group: string;
    shuffle_answers: boolean;
    time_limit_minutes: number;
    mult_attempts: boolean;
    view_responses: string;
    show_answer: string;
    questions_one_by_one: boolean;
    respondus_lockdown: boolean;
    require_view_results: boolean;
    webcam_required: boolean;
    lock_questions: boolean;
    due: Date;
    available_from: Date;
    available_until: Date;
    questions: QuizQuestions[];
}