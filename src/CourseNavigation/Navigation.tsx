import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { courses } from "../Database";


export default function CoursesNavigation() {

  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);

  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];


  return (
    <div>
      <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 position-fixed d-flex d-none d-md-block"
      >
        {links.map((links) => (
          <Link key={course?._id} to={`/Courses/${course?._id}/${links}`} id={`wd-course-${links}-link`}
            className={`list-group-item text-danger border border-0 ${pathname.includes(links) ? "active" : ""}`}>
            {links}
          </Link>
        ))}
      </div>
    </div>
  );
}
