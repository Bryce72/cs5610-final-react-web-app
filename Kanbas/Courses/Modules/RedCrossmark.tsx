import { FaTimesCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
    return (
        <span className="me-1 position-relative">
            <FaTimesCircle style={{ top: "3.25px" }}
                className="text-danger me-1 position-absolute fs-5" />
            <FaCircle className="text-white me-1 fs-5" />
        </span>
    );
}

