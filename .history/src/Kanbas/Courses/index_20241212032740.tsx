import React from "react";
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Assignments from "./Assignments";
import Home from "./Home";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";
import AssignmentEditorNew from "./Assignments/AssignmentEditorNew";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2
        className="text-danger d-flex d-none d-md-block sticky-top"
        style={{ backgroundColor: "white" }}
      >
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
        <hr className="d-none d-md-block" />
      </h2>
      <div className="d-flex">
        <div className="d-md-block flex-fill">
          <CoursesNavigation />

          <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<h3>{<Assignments />}</h3>} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />

              <Route
                path="Assignments/AssignmentEditorNew"
                element={<AssignmentEditorNew cid={cid} />}
              />

              <Route path="Quizzes" element={<h3>{<Quizzes />}</h3>} />
              <Route
                path="/Kanbas/Courses/:cid/Quizzes"
                element={<Quizzes />}
              />
              <Route
                path="/Kanbas/Courses/:cid/Quizzes/:quizId"
                element={<QuizDetails />}
              />
              <Route path="Quizzes/QuizEditor" element={<QuizEditor />} />
              <Route path="People" element={<h3>{<PeopleTable />}</h3>} />
              <Route
                path="Quizzes/:quizId/QuizPreview"
                element={<QuizPreview />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
