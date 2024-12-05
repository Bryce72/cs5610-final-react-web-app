import QuestionEditor from "./QuestionEditor";
import Quizzes from "./Quizzes";
import QuizDetails from "./QuizDetails";
import {
  HashRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import TempNavigation from "./TempNavigation";
import { Provider } from "react-redux";
import store from "./store";
import Account from "./Account";
import KanbasNavigation from "./Navigation";
import "./styles.css";
import Courses from "./CourseNavigation";
import * as db from "./Database";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import React from "react";
import QuizPewview from "./QuizPreview";

const courses = db.courses;
const course = {
  _id: "6744e7072e798610ab356c31", //changed to objectId, RS101
  name: "Rocket Propulsion",
  number: "RS4550",
  startDate: "2023-01-10",
  endDate: "2023-05-15",
  department: "D123",
  credits: 4,
  description: "This course provides",
};

export default function Kanbas() {

  function DebugRoute() {
    const location = useLocation();

    useEffect(() => {
      console.log("Current path:", location.pathname);
      console.log("Current hash:", window.location.hash);
    }, [location]);

    return null; // This component doesn't render anything, it's only for debugging.
  }

  return (
    <Provider store={store}>
      <HashRouter>
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="account/signin" />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/QuizPreview" element={<QuizPewview />} />
            <Route path="/quizzes/questions/*" element={<QuestionEditor />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/QuizDetails" element={<QuizDetails />} />
            <Route
              path="kanbas/Dashboard"
              element={<Dashboard />} //courses={courses} course={course}
            />
            <Route
              path="/Courses/:cid/*"
              element={<Courses courses={courses} />}
            />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
