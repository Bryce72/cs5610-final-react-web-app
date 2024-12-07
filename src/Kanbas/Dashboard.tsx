import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse } from "./reducer"; // Adjust the path as needed
import * as enrollClient from "./client"; // Adjust the path as needed

export default function Dashboard({
  courses,
  course,
  enrolling,
  updateEnrollment,
  setEnrolling,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {


  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleEnrollmentClick = () => {
    setShowAllCourses(!showAllCourses);
  };

  const enrollButton = async (course: any) => {
    try {
      await enrollClient.createEnrollment(course);
      setCourse((prevCourses: any[]) =>
        prevCourses.map((c: { _id: any; }) =>
          c._id === course._id
            ? { ...c, enrolled: true }
            : c
        )
      );
    } catch (error) {
      console.error("Failed to enroll:", error);
    }
  };

  const unenrollButton = async (course: any) => {
    try {
      await enrollClient.deleteEnrollment(course);
      setCourse((prevCourses: any[]) =>
        prevCourses.map((c: { _id: any; }) =>
          c._id === course._id
            ? { ...c, enrolled: false }
            : c
        )
      );
    } catch (error) {
      console.error("Failed to unenroll:", error);
    }
  };

  const enrolledCourseIDs = new Set(
    enrollments
      .filter((enrollment: any) => enrollment.user === currentUser._id)
      .map((enrollment: any) => enrollment.course)
  );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />

      {currentUser.role === "FACULTY" && (
        <>
          <h5>New Course</h5>
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            Add
          </button>

          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>

          <br />
          {/* Bind input fields to the selected course state */}
          <input
            value={course?.name || ''} // Use the course name from state
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course?.description || ''} // Use the course description from state
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
        {currentUser.role === "STUDENT" && (
          <button
            onClick={handleEnrollmentClick}
            className="btn btn-primary fs-5 float-end"
            id="wd-enroll-course-click"
          >
            {showAllCourses ? "All Courses" : "Enrollment"}
          </button>
        )}
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="wd-dashboard-course">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={`/Kanbas/Courses/${course._id}/Home`}
                  >
                    <img
                      src="/images/course1.png"
                      width="100%"
                      height={160}
                      alt="Course"
                    />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {enrolling && (
                          <button onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
                            className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary">Go</button>

                      {currentUser.role === "FACULTY" && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>

                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              // Set the course state with the selected course data
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}

                      {currentUser.role === "STUDENT" && showAllCourses && (
                        <>
                          {enrolledCourseIDs.has(course._id) ? (
                            <button
                              id="wd-unenroll-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                unenrollButton(course);
                              }}
                              className="btn btn-danger me-2 float-end"
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              id="wd-enroll-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                enrollButton(course);
                              }}
                              className="btn btn-success float-end"
                            >
                              Enroll
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}