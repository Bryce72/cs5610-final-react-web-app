import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import FacultyPrivileges from "../../Account/FacultyPrivileges";
import { FaTrash } from "react-icons/fa";


export default function AssignmentControlButtons(
    { assignmentId, deleteAssignment }:
        {
           assignmentId: string;
            deleteAssignment: (assignmentId: string) => Promise<void>;
        }) {


    //show pop up before we delete
    const confirmDelete = (assignmentId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this assignment?");
        if (confirmed) {
            deleteAssignment(assignmentId);
        }
    }

    return (
        <FacultyPrivileges>
            <div className="float-end">
                <FaTrash className="text-danger me-2 mb-1" onClick={e => confirmDelete(assignmentId)} />
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
            </div>
        </FacultyPrivileges>
    );
}