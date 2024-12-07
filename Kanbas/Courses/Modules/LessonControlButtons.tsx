import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import FacultyPrivileges from "../../Account/FacultyPrivileges";
import { FaTrash } from "react-icons/fa";
export default function LessonControlButtons() {
    return (
        <FacultyPrivileges>
            <div className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
            </div>
        </FacultyPrivileges>
    );
}
