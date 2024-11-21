import express from 'express';
import session from "express-session";
import cors from "cors";

import QuizRoutes from "./Kanbas/Quiz/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";

const app = express()

// Change NETLIFY_URL when MongoDB set up
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",

})
);



app.listen(4000)