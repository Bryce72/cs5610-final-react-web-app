import { Link, useLocation } from "react-router-dom";
import { courses } from "../Database";
import { useParams } from "react-router";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const location = useLocation();
  const course = courses.find((course) => course._id === cid);
  //course should now be affiliated with course ID
  //console.log("testing location: ", location)

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const formatLinkPath = (link : string) => {
    return `/Kanbas/Courses/${cid}/${link}`;
  };

  return (
    <div id="wd-courses-navigation"  className="wd list-group fs-5 rounded-0">
              {links.map((link) => {
        const isActive = location.pathname.includes(link);

        return (
          <Link key={link} to={formatLinkPath(link)} className={`list-group-item text-danger border border-0 ${isActive ? "active" : ""}`}>
            {link}
          </Link>
        );
      })}
    </div>
);}


/*
      <Link id="wd-course-home-link"        to="/Kanbas/Courses/1234/Home"         className="list-group-item text-danger border border-0">Home</Link>
      <Link id="wd-course-modules-link"     to="/Kanbas/Courses/1234/Modules"      className="list-group-item text-danger border border-0">Modules</Link>
      <Link id="wd-course-piazza-link"      to="/Kanbas/Courses/1234/Piazza"       className="list-group-item text-danger border border-0">Piazza</Link>
      <Link id="wd-course-zoom-link"        to="/Kanbas/Courses/1234/Zoom"         className="list-group-item text-danger border border-0">Zoom</Link>
      <Link id="wd-course-quizzes-link"     to="/Kanbas/Courses/1234/Assignments"  className="list-group-item text-danger border border-0">Assignments</Link>
      <Link id="wd-course-assignments-link" to="/Kanbas/Courses/1234/Quizzes"      className="list-group-item text-danger border border-0">Quizzes</Link>
      <Link id="wd-course-grades-link"      to="/Kanbas/Courses/1234/Grades"       className="list-group-item text-danger border border-0">Grades</Link>
      <Link id="wd-course-people-link"      to="/Kanbas/Courses/:cid/People"       className="list-group-item text-danger border border-0">People</Link>
*/