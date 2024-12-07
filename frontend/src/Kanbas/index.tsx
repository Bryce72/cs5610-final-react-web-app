import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedRole from "./Account/ProtectedRole";
import Session from "./Account/Session";



import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
//import * as db from "./Database";



export default function Kanbas() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  
  
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

 const findCoursesForUser = async () => {
   try {
     const courses = await userClient.findCoursesForUser(currentUser._id);
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };

 const updateEnrollment = async (courseId: string, enrolled: boolean) => {
  if (enrolled) {
    await userClient.enrollIntoCourse(currentUser._id, courseId);
  } else {
    await userClient.unenrollFromCourse(currentUser._id, courseId);
  }
  setCourses(
    courses.map((course) => {
      if (course._id === courseId) {
        return { ...course, enrolled: enrolled };
      } else {
        return course;
      }
    })
  );
};

 const fetchCourses = async () => {
   try {
     const allCourses = await courseClient.fetchAllCourses();
     const enrolledCourses = await userClient.findCoursesForUser(
       currentUser._id
     );
     const courses = allCourses.map((course: any) => {
       if (enrolledCourses.find((c: any) => c._id === course._id)) {
         return { ...course, enrolled: true };
       } else {
         return course;
       }
     });
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };

 useEffect(() => {
  if (enrolling) {
    fetchCourses();
  } else {
    findCoursesForUser();
  }
}, [currentUser, enrolling]);
 
 

 
  const addNewCourse = async () => {

    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
 
  };






  


  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };


  
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })
    );
  };




  return (
    
    <Provider store={store}>
    <Session>
    <div id="wd-kanbas">
            <KanbasNavigation />
            <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="/Kanbas/Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<ProtectedRoute>
                
               
                <Dashboard
                    courses={courses}
                    course={course}
                    
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling} setEnrolling={setEnrolling}  updateEnrollment={updateEnrollment}
                    />
                    
                                                </ProtectedRoute>} />
              <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/></ProtectedRoute>} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
            </div>
    </div>
    </Session>
    </Provider>
    
);}
