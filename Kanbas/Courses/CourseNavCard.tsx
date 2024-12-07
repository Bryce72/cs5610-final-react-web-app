import { useDispatch } from "react-redux";
import FacultyPrivileges from "../Account/FacultyPrivileges";
import { Enrollment } from "../Types";
import { useSelector } from "react-redux";
import { addEnrollment, removeEnrollment } from "../Enrollments/reducer";
import * as enrollmentClient from "../Enrollments/client";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function CourseNavCard(
    {
        course, //received from dashboard, current course we're turning into a nav card
        enrollmentMode, //is user allowed to modify their enrollment?
        deleteCourse, //connects to server and updates `courses` state variable from the index
        setCourse //sets the `course` state variable from the index
    }:
        {
            course: any;
            enrollmentMode: boolean;
            deleteCourse: (course: any) => void;
            setCourse: (course: any) => void;
        }
) {

    //REDUX
    const dispatch = useDispatch();
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    //STATE VARIABLE
    const [isEnrolled, setIsEnrolled] = useState<boolean>(
        enrollments.some(
            (enrollment: any) => {
                const sameUser = enrollment.user === currentUser._id;
                const sameCourse = enrollment.course === course._id;
                return sameUser && sameCourse;
            }
        )
    );

    useEffect(() => {
        setIsEnrolled(enrollments.some(
            (enrollment: any) => {
                const sameUser = enrollment.user === currentUser._id;
                const sameCourse = enrollment.course === course._id;
                return sameUser && sameCourse;
            })
        );
        //console.log(`\t\tuseEffect --> ${course._id} = ${isEnrolled}`);
    }, [enrollments]);


    //add enrollment to the server and to the redux
    const newEnrollment = async () => {
        const enrollment = { user: currentUser._id, course: course._id } as Enrollment;
        console.log(`\tnew enrollment - ${JSON.stringify(enrollment)}`);

        dispatch(addEnrollment(enrollment))
        await enrollmentClient.addEnrollment(enrollment.user, enrollment.course);
    }

    //remove enrollment from the server and from the redux
    const deleteEnrollment = async () => {
        const enrollment = { user: currentUser._id, course: course._id } as Enrollment;
        console.log(`\tgoing to delete enrollment - ${JSON.stringify(enrollment)}`);

        dispatch(removeEnrollment(enrollment))
        await enrollmentClient.removeEnrollment(enrollment.user, enrollment.course);
    }

    const navigate = useNavigate();

    const goButton =
        <button className="btn btn-primary "
            onClick={e => navigate(`/Kanbas/Courses/${course._id}`)}>
            Go
        </button>;

    const unEnrollButton =
        <button className="btn btn-danger me-1 float-end"
            onClick={(e) => {
                e.preventDefault();
                deleteEnrollment();
            }}>
            Unenroll
        </button>

    const enrollButton =
        <button className="btn btn-success me-1 mb-3 float-end"
            onClick={(e) => {
                e.preventDefault();
                newEnrollment();
            }}>
            Enroll
        </button>

    const getCourseButtons = (courseId: string) => {
        if (enrollmentMode) {
            if (isEnrolled === true) {
                return (
                    <span>
                        {goButton}
                        {unEnrollButton}
                    </span>);
            } else {
                //we're not currently enrolled so can't use go button
                return enrollButton;
            }
        }
        //if we're not in enrollment mode just show the normal Go button
        return (goButton);
    }

    return (
        <div id={`course-card-${course._id}`}>
            <img src="/images/reactjs.jpg" width="100%" height={160} />
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title fw-bold"  >
                    {course.name}
                </h5>
                <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                    {course.description}
                </p>

                {getCourseButtons(course._id)}

                {/* edit and delete courses */}
                <FacultyPrivileges>
                    <button id="wd-delete-course-click" className="btn btn-danger float-end"
                        onClick={(clickEvent) => {
                            console.log(`\tbutton click to delete course\n${JSON.stringify(course, null, 2)}`)
                            clickEvent.preventDefault(); //don't navigate like the Go button does
                            deleteCourse(course._id);
                        }}>
                        Delete
                    </button>

                    <button id="id-wd-edit-course-click" className="btn btn-warning float-end me-2"
                        onClick={(event) => {
                            console.log(`\tbutton click to edit course\n${JSON.stringify(course, null, 2)}`)
                            event.preventDefault(); //don't navigate like the Go button does
                            setCourse(course);
                        }}>
                        Edit
                    </button>
                </FacultyPrivileges>
            </div>
        </div>
    );
}
