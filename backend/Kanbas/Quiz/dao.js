// Import your Database or MongoDB connection
// import db from mongo when ready

// Find all quizzes for a specific course
export function findQuizzesForCourse(courseId) {
  const { quizzes } = Database;
  return quizzes.filter((quiz) => quiz.courseId === courseId);
}

// Find all quizzes
export function findAllQuizzes() {
  const { quizzes } = Database;
  return quizzes;
}

// Create a new quiz
export function createQuiz(quiz) {
  const newQuiz = { ...quiz, quiz_id: Date.now().toString() };
  Database.quizzes.push(newQuiz);
  return newQuiz;
}

// Delete a quiz by ID
export function deleteQuiz(quizId) {
  const { quizzes } = Database;
  Database.quizzes = quizzes.filter((quiz) => quiz.quiz_id !== quizId);
}

// Update a quiz
export function updateQuiz(quizId, quizUpdates) {
  const { quizzes } = Database;
  const quiz = quizzes.find((quiz) => quiz.quiz_id === quizId);
  if (quiz) {
    Object.assign(quiz, quizUpdates);
  }
  return quiz;
}
