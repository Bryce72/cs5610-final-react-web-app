import React from "react";
import { AiOutlineStop } from "react-icons/ai";

export default function StopCheckmark() {
  return (
    <span className="me-1 position-relative">
      <AiOutlineStop style={{ top: "2px" }}
        className="text-success me-1 position-absolute fs-5" />
      <AiOutlineStop className="text-white me-1 fs-6" />
    </span>
);}
