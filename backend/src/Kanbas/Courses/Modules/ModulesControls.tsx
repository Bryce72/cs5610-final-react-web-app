import { FaCircleArrowRight, FaCircleChevronLeft, FaPlus, FaRegCircleCheck } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { FaBan, FaCheck, FaCheckSquare, FaCircle, FaRegCheckCircle } from "react-icons/fa";
import ModuleEditor from "./ModuleEditor";
import ProtectedRole from "../../Account/ProtectedRole";

export default function ModulesControls(
    { moduleName, setModuleName, addModule }:
    { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }
) {
    return (
        <ProtectedRole role= "FACULTY">
        <div id="wd-modules-controls" className="modules-controls-grid d-flex flex-nowrap justify-content-between">
            <div className="modules-controls-grid-items d-inline-flex flex-fill">
                <div className="me-1">
                    <button id="wd-collapse-all-btn" className="btn btn-lg btn-secondary" style={{ minWidth: "150px" }}>
                        Collapse All
                    </button>
                </div>
                <div className="me-1">
                    <button id="wd-view-progress-btn" className="btn btn-lg btn-secondary" style={{ minWidth: "150px" }}>
                        View Progress
                    </button>
                </div>
                <div className="dropdown me-1">
                    <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" style={{ minWidth: "150px" }}>
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
                                <GreenCheckmark />
                                Unpublish all modules AND items
                            </a>
                        </li>
                        <li>
                            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
                                <GreenCheckmark />
                                Unpublish modules only
                            </a>
                        </li>
                    </ul>
                </div>
                <button id="wd-add-module-btn" className="btn btn-lg btn-danger" data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" style={{ minWidth: "150px" }}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Module
                </button>
                <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                    setModuleName={setModuleName} addModule={addModule} />
            </div>
        </div>
        </ProtectedRole>
    );
}
