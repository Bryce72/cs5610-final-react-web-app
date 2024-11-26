import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    await quizzesDao.deleteQuiz(qid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const newQuiz = await quizzesDao.createQuiz(cid, req.body);
    res.send(newQuiz);
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    await quizzesDao.updateQuiz(qid, req.body);
    res.sendStatus(204);
  });

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await quizzesDao.getQuizzesByCourse(cid);
    console.log(quizzes);
    res.json(quizzes);
  });

  //added
  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quizzes = await quizzesDao.getQuizById(qid);
    console.log(quizzes);
    res.json(quizzes);
  });
}
