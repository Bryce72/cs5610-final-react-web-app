import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  // Delete quiz
  app.delete("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    dao.deleteQuiz(quizId);
    res.sendStatus(204);
  });

  // Create a new quiz
  app.post("/api/quizzes", (req, res) => {
    const quiz = dao.createQuiz(req.body);
    res.send(quiz);
  });

  // Get all quizzes
  app.get("/api/quizzes", (req, res) => {
    const quizzes = dao.findAllQuizzes();
    res.send(quizzes);
  });

  // Get all quizzes for a specific course
  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quizzes = dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  // Update a quiz
  app.put("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const updatedQuiz = dao.updateQuiz(quizId, quizUpdates);
    if (updatedQuiz) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ error: "Quiz not found" });
    }
  });
}
