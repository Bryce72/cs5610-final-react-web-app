import RedCrossMark from "./RedCrossmark";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";
import ModuleEditor from "./ModuleEditor";
import FacultyPrivileges from "../../Account/FacultyPrivileges";

export default function ModulesControls(
    { moduleName, setModuleName, addModule }:
        {
            moduleName: string;
            setModuleName: (title: string) => void;
            addModule: () => void;
        }) {

    return (
        <FacultyPrivileges>
            <div id="wd-modules-controls" className="text-nowrap">

                <button id="wd-add-module-btn"
                    className="btn btn-lg btn-danger my-1 me-1 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#wd-add-module-dialog"
                >
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Module
                </button>

                <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                    setModuleName={setModuleName} addModule={addModule} />

                <div className="dropdown d-inline me-1 my-1 float-end">
                    <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                        type="button" data-bs-toggle="dropdown">
                        <GreenCheckmark />
                        Publish All
                    </button>


                    <ul className="dropdown-menu">
                        <li>
                            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
                                <GreenCheckmark />
                                Publish all modules and items
                            </a>
                        </li>
                        <li>
                            <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
                                <GreenCheckmark />
                                Publish modules only
                            </a>
                        </li>

                        <li>
                            <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
                                <RedCrossMark />
                                Unpublish all modules and items
                            </a>
                        </li>
                        <li>
                            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
                                <RedCrossMark />
                                Unpublish all modules only
                            </a>
                        </li>

                    </ul>


                </div>

                <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 my-1 float-end"
                    type="button">
                    View Progress
                </button>

                <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 my-1 float-end"
                    type="button">
                    Collapse All
                </button>

            </div>
        </FacultyPrivileges>
    );
}
