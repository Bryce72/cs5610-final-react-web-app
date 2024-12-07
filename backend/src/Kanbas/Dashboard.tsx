import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRole from "./Account/ProtectedRole";
import { enrollInCourse, unenrollFromCourse } from "./reducers/enrollmentsSlice";
import { fetchAllCourses } from "./Courses/client";

interface Course {
  enrolled: any;
  _id: string;
  name: string;
  description: string;

}


interface Enrollment {
  user: string;
  course: string;
}

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean; // Add this
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: DashboardProps) {
  // Generate image paths dynamicalldy
  const courseImages: { [key: string]: string } = {};
  for (let i = 101; i <= 121; i++) {
    const courseId = `RS${i}`;
    courseImages[courseId] = `./images/${courseId}.jpg`;
  }

  const defaultImage = "/images/test.jpg";

  // Access currentUser and enrollments from Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments: Enrollment[] = useSelector((state: any) => state.enrollmentReducer.enrollments);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);



  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard



        <button
          onClick={() => fetchAllCourses()}
          className="float-end btn btn-primary"
        >
          {showAllCourses ? "My Courses" : "All Courses"}
        </button>


        <ProtectedRole role="STUDENT">
          <button
            className="wd-enrollmentButton float-end btn btn-primary"
            onClick={() => fetchAllCourses()}
          >
            Enrollments
          </button>
        </ProtectedRole>
      </h1>

      <hr />

      <ProtectedRole role="FACULTY">
        <h5>
          New Course
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
        </h5>
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
        <hr />

        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
        <hr />
      </ProtectedRole>

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => {
            const isEnrolled = enrollments.some(
              (enrollment) =>
                enrollment.user === currentUser?._id && enrollment.course === course._id
            );

            return (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
                key={course._id}
              >
                <div className="card rounded-3 overflow-hidden">
                  {/* Conditionally render the link only if the student is enrolled or the user is not a student */}
                  {isEnrolled || currentUser?.role !== "STUDENT" ? (
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <img
                        src={courseImages[course._id] || defaultImage}
                        width="100%"
                        height={160}
                        alt={course.name}
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
                      </div>
                    </Link>
                  ) : (
                    <div className="wd-dashboard-course-link text-decoration-none text-dark">
                      <img
                        src={courseImages[course._id] || defaultImage}
                        width="100%"
                        height={160}
                        alt={course.name}
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
                      </div>
                    </div>
                  )}

                  <div className="card-body">
                    {/* Enrollment buttons visible only to students */}
                    {currentUser?.role === "STUDENT" && (
                      <>
                        {isEnrolled ? (
                          <button
                            className="btn btn-danger"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                unenrollFromCourse({
                                  userId: currentUser._id,
                                  courseId: course._id,
                                })
                              );
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                enrollInCourse({
                                  userId: currentUser._id,
                                  courseId: course._id,
                                })
                              );
                            }}
                          >
                            Enroll
                          </button>
                        )}
                      </>
                    )}

                    {/* Course management buttons visible only to faculty */}
                    {currentUser?.role === "FACULTY" && (
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
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
