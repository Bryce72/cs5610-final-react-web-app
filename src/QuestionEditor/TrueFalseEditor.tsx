import { FaArrowRight } from "react-icons/fa";
export default function TrueFalseEditor() {
    const fixmeBoolean = true;
    return (
        <div id="question-editor-true-false">
            {fixmeBoolean && <FaArrowRight className="fs-2 text-success" />}
            <span className="fs-3 fw-bold ms-2">True</span>
            <br/>
            {!fixmeBoolean && <FaArrowRight className="fs-2 text-success" />}
            <span className="fs-3 fw-bold ms-2">False</span>
        </div>
    );
}