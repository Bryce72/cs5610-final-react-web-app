import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaRegTrashAlt } from "react-icons/fa";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus style={{ fontSize: '30px' }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
