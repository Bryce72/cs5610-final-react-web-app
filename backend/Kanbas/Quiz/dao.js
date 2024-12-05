import model from "./model.js";

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function getQuizzesByCourse(courseId) {
  console.log("courseId", courseId);
  const res = model.find({ course: courseId });
  return res;
}

export function createQuiz(quiz) {
  delete quiz._id;
  return model.create(quiz);
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}

//double check
export function getQuizById(quiz_id) {
  console.log("getquizbyid - backend");
  return model.find({ _id: quiz_id });
}
