import React, { useState, useEffect } from 'react';
import ModulesControls from './ModulesControls';
import { BsGripVertical, BsPlug } from 'react-icons/bs';
import ModuleControlButtons from './ModuleControlButtons';
import LessonControlButtons from './LessonControlButtons';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline, IoHomeOutline, IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosGitNetwork } from 'react-icons/io';
import { GrNotes } from 'react-icons/gr';
import { GoRocket } from 'react-icons/go';
import { useParams } from "react-router";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import * as courseClient from "../client";


export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [modules, setModules] = useState<any[]>([]);

  // create module
  const createModule = async (module: any) => {
    const newModule = { course: cid, name: moduleName };
    const createdModule = await courseClient.createModuleForCourse(newModule);
    dispatch(addModule(createdModule));
  };
  // remove modules
  const removeModule = async (moduleId: string) => {
    console.log("Removing module:", moduleId);
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  // update module
  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const [moduleName, setModuleName] = useState("");

  // get modules
  const fetchModules = async () => {
    try {
      if (cid) {
        const modules = await courseClient.findModulesForCourse(cid);
        console.log("Fetched modules:", modules);
        setModules(modules);
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
  useEffect(() => {
    if (cid) {
      fetchModules();
    };
  }, [cid, modules]);

  const [isLeftMenuVisible, setLeftMenuVisible] = useState(false);
  const [isRightMenuVisible, setRightMenuVisible] = useState(false);

  const toggleLeftMenu = () => {
    setLeftMenuVisible(!isLeftMenuVisible);
    if (isRightMenuVisible) setRightMenuVisible(false);
  };

  const toggleRightMenu = () => {
    setRightMenuVisible(!isRightMenuVisible);
    if (isLeftMenuVisible) setLeftMenuVisible(false);
  };

  return (
    <>
      <div
        style={{ height: "60px" }}
        className="navbar-container bg-black text-white d-flex justify-content-between align-items-center p-3 position-fixed w-100 top-0 left-0 d-md-none"
      >
        <h5 className="m-0 flex-grow-1 d-flex justify-content-center">CS5200 2024 Fall Course 1234</h5>
        <nav className="left-menu navbar navbar-expand-md navbar-dark list-group rounded-0 position-fixed d-md-none">
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleLeftMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>

      {isLeftMenuVisible && (
        <div
          id="left-kanbas-navigation"
          className="list-group position-fixed top-0 bottom-0 start-0 bg-white z-3"
          style={{ width: "100%", height: "100%", overflowY: "auto" }}
        >
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={toggleLeftMenu}
          ></button>

          <div className="p-4 z-10">
            <h2 className="mb-4 text-danger">CANVAS</h2>
            <Link to="/Kanbas/Dashboard" className="list-group-item border-0 text-danger">
              <AiOutlineDashboard className="fs-3 me-2" /> Dashboard
            </Link>
            <Link to="/Kanbas/Account" className="list-group-item border-0 text-danger">
              <FaRegCircleUser className="fs-3 me-2" /> Account
            </Link>
            <Link to="/Kanbas/Courses" className="list-group-item border-0 text-danger">
              <LiaBookSolid className="fs-3 me-2" /> Courses
            </Link>
            <Link to="/Kanbas/Calendar" className="list-group-item border-0 text-danger">
              <IoCalendarOutline className="fs-3 me-2" /> Calendar
            </Link>
            <Link to="/Kanbas/Inbox" className="list-group-item border-0 text-danger">
              <FaInbox className="fs-3 me-2" /> Inbox
            </Link>
            <Link to="/Labs" className="list-group-item border-0 text-danger">
              <IoSettingsOutline className="fs-3 me-2" /> Labs
            </Link>
          </div>
        </div>
      )}

      <div>
        <nav className="right-menu navbar navbar-expand-md navbar-dark list-group rounded-0 position-fixed d-md-none">
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleRightMenu}
          >
            <span><IoIosArrowDown /></span>
          </button>
        </nav>
      </div>

      {isRightMenuVisible && (
        <div
          id="right-kanbas-navigation"
          className="list-group position-fixed top-0 bottom-0 start-0 bg-white z-3"
          style={{ width: "100%", height: "100%", overflowY: "auto" }}
        >
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={toggleRightMenu}
          ></button>

          <div className="p-4 z-10k">
            <Link to="/Kanbas/Courses/1234/Home" className="list-group-item border-0 text-danger">
              <IoHomeOutline className="align-self-center me-3" />
              Home
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Modules`} className="list-group-item text-danger border-0">
              <IoIosGitNetwork className="align-self-center me-3" />
              Modules
            </Link>
            <Link to="/Kanbas/Courses/1234/Piazza" className="list-group-item text-danger border-0">
              <BsPlug className="align-self-center me-3" />
              Piazza
            </Link>
            <Link to="/Kanbas/Courses/1234/Zoom" className="list-group-item text-danger border-0">
              <BsPlug className="align-self-center me-3" />
              Zoom
            </Link>
            <Link to="/Kanbas/Courses/1234/Assignments" className="list-group-item text-danger border-0">
              <GrNotes className="align-self-center me-3" />
              Assignments
            </Link>
            <Link to="/Kanbas/Courses/1234/Quizzes" className="list-group-item text-danger border-0">
              <GoRocket className="align-self-center me-3" />
              Quizzes
            </Link>
            <Link to="/Kanbas/Courses/:cid/People" className="list-group-item text-danger border-0">
              <IoPeopleOutline className="align-self-center me-3" />
              People
            </Link>
          </div>
        </div>
      )}


      <div>
        <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
          addModule={() => {
            createModule({ course: cid, name: moduleName });
            setModules(modules);
            setModuleName("");
          }} /> <br /><br /><br /><br />

        <ul id="wd-modules" className="list-group rounded-0 d-flex flex-grow d-md-block d-lg-block">
          {modules
            // .filter((module: any) => module.course.toString() === cid)
            .map((module: any) => (

              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />

                  {!module.editing && module.name}
                  {module.editing && (
                    <input className="form-control w-50 d-inline-block"
                      onChange={(e) =>
                        saveModule({ ...module, name: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name} />)}

                  <ModuleControlButtons moduleId={module._id}
                    deleteModule={(moduleId) => {
                      removeModule(moduleId);
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                </div>

                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                        <LessonControlButtons />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}



