// import db from mongo when ready

//TODO
export function findQuizzesForCourse(courseID){

}

//TODO
export function createQuiz(quiz){
    //add unique ID to the new quiz, for now use timestamp
    const newQuiz = { ...quiz, quiz_id: Date.now().toString()}
}

//TODO
export function deleteQuiz(quizID){
}

//TODO
export function updateQuiz(quizID, quizUpdates){
}