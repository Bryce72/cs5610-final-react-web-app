import { IoEllipsisVertical } from "react-icons/io5";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function AssignmentControlsButtons(

) {
  return (
    <div className="float-end ms-2">
      <FaPlus />
      <IoEllipsisVertical className="fs-4 ms-4" />
    </div>
);}
