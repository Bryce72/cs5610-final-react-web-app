import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    await quizzesDao.deleteAssignment(qid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { qid } = req.params;
    const newQuiz = await quizzesDao.createAssignment(qid, req.body);
    res.send(newQuiz);
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    await quizzesDao.updateAssignment(qid, req.body);
    res.sendStatus(204);
  });

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await quizzesDao.getAssignmentsByCourse(cid);
    res.json(quizzes);
  });
}
