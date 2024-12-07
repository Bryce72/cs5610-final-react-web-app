import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LessonControlButtons from "./LessonControlButtons";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

//icons and react components
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModuleControls";
import ModuleControlButtons from "./ModuleControlButtons";


export default function Modules() {
  const { cid } = useParams<{ cid: string }>(); //get from url path

  const [moduleName, setModuleName] = useState(""); //local state variable for name of current module

  const { modules } = useSelector((state: any) => state.modulesReducer); //redux, list of modules
  const dispatch = useDispatch();

  //get list of modules from the server
  const fetchModules = async () => {
    //first ensure cid is a string and isn't undefined
    if (typeof cid === "string") {
      const serverModules = await coursesClient.findModulesForCourse(cid);
      dispatch(setModules(serverModules));
    } else {
      throw new TypeError(`'cid' should be a string but is actually ${typeof cid}`)
    }
  };
  //automatically fetch modules from the server when we load this component
  useEffect(() => {
    fetchModules();
  }, []);

  //4.5.2 - create new module
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  //4.5.3 - delete a module
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  //4.5.4
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


  return (
    <div className="d-flex flex-column">
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse}
      />


      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => {
          return (
            <li key={`$li-${module.name}-${module._id}`} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              {/* module title */}
              <div className="wd-title p-3 ps-2 bg-secondary clearfix">

                <BsGripVertical className="me-2 fs-3 float-start" />

                <div className=" fw-bold">
                  {/*NOTE: if module name becomes too long it ruins the layout */}
                  {!module.editing && module.name}
                  {module.editing && (
                    <input className="form-control w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { saveModule({ ...module, editing: false }); }
                      }}
                      defaultValue={module.name} />
                  )}
                </div>

                <div className="float-end">
                  <ModuleControlButtons moduleId={module._id}
                    deleteModule={(moduleId) => removeModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                </div>

              </div>

              {/* make the list of lessons underneath the module title */}
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </li>
                  ))}
                </ul>)
              }
            </li>
          );
        })}
      </ul>

    </div>
  );
}



// old way of getting value for modules
// const [modules, setModules] = useState<any[]>(
//   db.modules.filter((module: any) => module.course === cid.cid)
// );


// const addModule = () => {
//   console.log("adding new module")

//   setModules([...modules, {
//     _id: new Date().getTime().toString(),
//     name: moduleName, course: cid, lessons: []
//   }]);
//   setModuleName("");
// };

// const deleteModule = (moduleId: string) => {
//   console.log(`deleting module #${moduleId}`)
//   setModules(modules.filter((m) => m._id !== moduleId));
// };

// const editModule = (moduleId: string) => {
//   //module we want to edit is set to have editing attribute equal true
//   console.log(`setting module #${moduleId} to be editable`)
//   setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
// };

// const updateModule = (updated_module: any) => {
//   //update the `modules` state array
//   console.log(`updating module #${updated_module._id}`)
//   setModules(modules.map((curr_module) => (curr_module._id === updated_module._id ? updated_module : curr_module)));
// };

// note: my custom solution to 3.3.3 (editing a module)
// const getEditNameComponent = (curr_module: any) => {
//   //double check we should be making the input field
//   if (!curr_module.editing) {
//     console.log(`Tried to create input for for module #${curr_module} but it should not have one`)
//     return (curr_module.name)
//   }

//   return (
//     <input className="form-control" defaultValue={curr_module.name}
//       onChange={(changeEvent) => {
//         changeEvent.preventDefault();
//         let inputValue = changeEvent.target.value
//         console.log(`old module name = ${curr_module.name}\nnew module name = ${inputValue}`)
//         curr_module.name = inputValue;
//         updateModule(curr_module);
//       }}
//       onKeyUp={(keyEvent) => {
//         keyEvent.preventDefault();
//         if (keyEvent.key === "Enter") {
//           curr_module.editing = false;
//           updateModule(curr_module);
//           console.log(`\tediting = ${curr_module.editing} for module #${curr_module._id}`);
//         }
//       }}
//     />);
// }
// {/* {module.editing ? getEditNameComponent(module) : module.name} */}
