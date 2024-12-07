import Modules from "../Modules";
import CourseStatus from "./Status";
import React from "react";

export default function Home() {
  return (
<div className="d-flex" id="wd-home">
  <div className="flex-fill">

          <Modules />
          </div>

  <div className="d-md-block">
          <CourseStatus />
</div>
</div>
  );
}
