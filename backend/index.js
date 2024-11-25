import express from "express";
import session from "express-session";
import cors from "cors";
import QuizAttemptRoutes from "./Kanbas/QuizAttempt/routes.js";
import QuizRoutes from "./Kanbas/Quiz/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";

const app = express();

// Change NETLIFY_URL when MongoDB set up
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

//QUESTION: this turns on proxy support if we're in production???
// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.NODE_SERVER_DOMAIN,
//     };
// }
// app.use(
//     session(sessionOptions)
// );

app.use(express.json()); //lets clilent put json into request body
QuizRoutes(app);
QuizAttemptRoutes(app);
UserRoutes(app);

app.listen(4000);
