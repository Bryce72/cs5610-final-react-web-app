import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import FacultyPrivileges from "../../Account/FacultyPrivileges";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
    moduleId: string; deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void
}) {
    return (
        <FacultyPrivileges>
            <div className="float-end">
                <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
                <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
                <GreenCheckmark />
                <FaPlus />
                <IoEllipsisVertical className="fs-4" />
            </div>
        </FacultyPrivileges>
    );
}
