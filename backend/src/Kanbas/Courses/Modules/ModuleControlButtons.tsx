import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ProtectedRole from "../../Account/ProtectedRole";
export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule }: 
  { moduleId: string; deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void}) {
  return (
    <ProtectedRole role= "FACULTY">
    <div className="float-end">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <GreenCheckmark />
      <BsPlus style={{ fontSize: '30px' }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
    </ProtectedRole>
);}
