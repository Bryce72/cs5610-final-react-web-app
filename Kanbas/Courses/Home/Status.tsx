import { FaChartLine } from "react-icons/fa";
import { BsFillMegaphoneFill } from "react-icons/bs";

import { FaRegBell } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import FacultyPrivileges from "../../Account/FacultyPrivileges";

export default function CourseStatus() {
    return (
        <FacultyPrivileges>
            <div id="wd-course-status" className="ms-5 d-none d-xl-block" style={{ width: "300px" }}>
                <h2>Course Status</h2>

                {/* publish and unpublish buttons */}
                <div className="d-flex">
                    <div className="w-50 pe-1">
                        <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
                            <MdDoNotDisturbAlt className="me-2 fs-5" />
                            Unpublish
                        </button>
                    </div>
                    <div className="w-50">
                        <button className="btn btn-lg btn-success w-100">
                            <FaCheckCircle className="me-2 fs-5" />
                            Publish
                        </button>
                    </div>
                </div>
                <br />

                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <BiImport className="me-2 fs-5" />
                    Import Existing Content
                </button>

                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <LiaFileImportSolid className="me-2 fs-5" />
                    Import from Commons
                </button>

                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaHome className="me-2 fs-5" />
                    Choose Home Page
                </button>
                <br />
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <GrView className="me-2 fs-5" />
                    View Course Screen
                </button>
                <br />
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <BsFillMegaphoneFill className="me-2 fs-5" />
                    New Announcement
                </button>
                <br />
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaChartLine className="me-2 fs-5" />
                    New Analytics
                </button>
                <br />
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaRegBell className="me-2 fs-5" />
                    View Course Notifications
                </button>
            </div>
        </FacultyPrivileges>
    );
}
