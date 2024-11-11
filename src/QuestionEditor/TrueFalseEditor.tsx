import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
export default function TrueFalseEditor() {
    const [answerBool, setAnswer] = useState(true);

    return (
        <div id="question-editor-true-false" className="d-flex flex-column">

            <div className="mb-2" onClick={e => setAnswer(true)}>
                <FaArrowRight className="fs-2 text-primary" visibility={answerBool ? "" : "hidden"} />
                <span className={`fs-5 fw-bold ms-2 ${answerBool ? "text-success" : ""}`}>
                    True
                </span>
            </div>


            <div onClick={e => setAnswer(false)}>
                <FaArrowRight className="fs-2 text-primary" visibility={answerBool ? "hidden" : ""} />
                <span className={`fs-5 fw-bold ms-2 ${answerBool ? "" : "text-danger"}`}>
                    False
                </span>
            </div>
        </div>
    );
}