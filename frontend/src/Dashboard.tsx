import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as courseClient from "./courseClient";
// import { enrollCourse, unenrollCourse } from "./reducer"; // Adjust the path as needed

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>([]);

  const fetchAllCourses = async () => {
    const courses = await courseClient.fetchAllCourses();
    setCourses(courses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        {courses.map((course) => (
          <div
            key={course._id}
            className="wd-dashboard-course col"
            style={{ width: "300px" }}
          >
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to={`/Courses/${course._id}/Home`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/course1.png`}
                  width="100%"
                  height={160}
                  alt="Course"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {course.name}
                  </h5>
                  <p
                    className="wd-dashboard-course-title card-text overflow-y-hidden"
                    style={{ maxHeight: 100 }}
                  >
                    {course.description}
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
