import * as quizDao from "./dao.js";

export default function QuizRoutes(app) {
  // delete quiz
  app.delete("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    dao.deleteQuiz(quizId);
    res.sendStatus(204);
  });

  // create new quiz
  app.post("/api/quizzes", (req, res) => {
    const quiz = { ...req.body, quiz_id: new Date().getTime().toString() };
    Database.quizzes.push(quiz);
    res.send(quiz);
  });

  app.get("/api/quizzes", (req, res) => {
    const quizzes = dao.findAllQuizzes();
    res.send(quizzes);
  });

  app.put("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    dao.updateQuiz(quizId, quizUpdates);
    res.sendStatus(204);
  });
}
