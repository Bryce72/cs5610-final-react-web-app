import { Route, Routes, Navigate } from "react-router"
import { useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//import clients
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentsClient from "./Enrollments/client";

//import react components
import Account from "./Account/Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation"
import Courses from "./Courses";

//redux stuff
import { setEnrollments } from './Enrollments/reducer';


export default function Kanbas() {
    //STATE VARIABLES
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>(
        // initial is an object with the default values for a course
        {
            _id: "0",
            name: "New Course",
            number: "New Number",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
            image: "/images/reactjs.jpg",
            description: "New Description"
        }
    );

    //REDUX
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    //add course to our server and our state variable
    const addNewCourse = async () => {

        //4.4.2 get object for the new course from the server
        const newCourse = await userClient.createCourse(course);

        //update value of the state variable
        setCourses([...courses, { ...course, ...newCourse }])
    }

    //delete a course from the server and the state variable
    const deleteCourse = async (courseId: string) => {
        //send delete request to server
        await courseClient.deleteCourse(courseId);

        //update state variable
        setCourses(
            courses.filter((course) => course._id !== courseId)
        );
    }

    //update a course on the server and in the state variable
    const updateCourse = async () => {
        //update server
        await courseClient.updateCourse(course);

        //update state variable
        setCourses(
            courses.map((curr_course) => {
                if (curr_course._id === course._id) {
                    return course;
                } else {
                    return curr_course;
                }
            })
        );
    };

    //get courses from the server to update the state variable
    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
        } catch (error) {
            console.log(`unable to get courses - ${error}`);
        }
    };

    //get enrollments from the server and use it to update redux
    const fetchEnrollments = async () => {
        console.debug(`\tfetching enrollments for ${currentUser.username}`);
        const serverEnrollments = await enrollmentsClient.getEnrollmentsForUser(currentUser._id);
        dispatch(setEnrollments(serverEnrollments));
    }

    //if currentUser changes then fetch courses and enrollments for that user
    useEffect(() => {
        if (currentUser) {
            fetchCourses();
            fetchEnrollments();
        } else {
            console.log("current user doesn't exist so not going to fetch courses or enrollments");
        }
    }, [currentUser]);

    return (
        <Session>
            <div id="wd-kanbas">
                <div className="d-none d-lg-block">
                    <KanbasNavigation />
                </div>

                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={
                            <ProtectedRoute>
                                <Dashboard
                                    courses={courses}
                                    course={course}
                                    fetchCourses={fetchCourses}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse} />
                            </ProtectedRoute>
                        } />
                        <Route path="/Courses/:cid/*" element={
                            <ProtectedRoute>
                                <Courses courses={courses} />
                            </ProtectedRoute>}
                        />
                        <Route path="/Calendar" element={<h1>TODO:Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>TODO:Inbox</h1>} />
                    </Routes>
                </div>

            </div>
        </Session>
    );
}