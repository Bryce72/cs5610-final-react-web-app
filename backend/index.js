import express from "express";
import session from "express-session";
import cors from "cors";
import QuizAttemptRoutes from "./Kanbas/QuizAttempt/routes.js";
import QuizRoutes from "./Kanbas/Quiz/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import mongoose from "mongoose";
import "dotenv/config";

// add connection to MongoDB - dinan
const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/5610final";
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

//QUESTION: this turns on proxy support if we're in production???
// I guess so - dinan

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
CourseRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
