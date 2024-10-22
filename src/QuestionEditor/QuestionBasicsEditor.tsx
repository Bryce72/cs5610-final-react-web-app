import { useLocation } from "react-router-dom";

// NOTE: maybe create a class for question types..? or maybe this gets put in the database or in it's own json file
const questionTypes = [
    { name: "Multiple Choice", path: "multiple-choice", instructions: "Enter your question text and multiple answers, then select the one correct answer." },
    { name: "True/False", path: "true-false", instructions: "Enter your question text, then select if True or False is the correct answer." },
    { name: "Fill in the Blanks", path: "fill-blanks", instructions: "Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer." }
]

//this is the part of the question editor that is the same for all question types
export default function QuestionBasicsEditor() {
    const { pathname } = useLocation()

    return (
        <div>
            <div className="d-flex">
                {/* TODO: get question title from database */}
                <input id="question-title" type="text" title="Question Title" placeholder="Question Title Here" className="form-control" />

                {/* TODO: get question type form database */}
                <select className="bootstrap-select" title="Question Type">
                    {questionTypes.map((qType) => mapToOption(qType, pathname))}
                </select>

                {/* TODO: get point value from database */}
                <label htmlFor="question-points">pts:</label>
                <input id="question-points" type="number" title="Number of Points" placeholder="0" className="form-control" />
            </div>

            <br />
            <div id="question-editor-instructions">
                {getCurrentQuestionType(pathname)?.instructions}
            </div>
            <br />

            {/* TODO: get question text from database */}
            <label htmlFor="question-text">
                <h5>Question:</h5>
            </label>
            <textarea id="question-text" className="form-control">
                # TODO turn this into a WYSIWYG editor (aka add controls for font, style, etc)
            </textarea>
        </div>
    );
}

/**
 * take one question type and turn it into an option for the drop-down menu
 * @param { name: any; path: any; instructions: string; } questionType
 * @param {string} currPath - used to determine if this option is selected or not
 * @returns {<option/>} - html option element for the given question type
 */
function mapToOption(questionType: { name: any; path: any; instructions: string; }, currPath: string) {
    console.log(`current path = ${currPath}\n\tlooking for question type: ${questionType.path}`)

    if (currPath.includes(questionType.path)) {
        return (<option selected>{questionType.name}</option>)
    }
    return (<option>{questionType.name}</option>);
}

/**
 * looks at the path and tells us what question type we're editing
 * @param {string} currPath
 * @returns { name: any; path: any; instructions: string; } - the question type
 */
function getCurrentQuestionType(currPath: string) {
    for (const questionType of questionTypes) {
        if (currPath.includes(questionType.path)) {
            return questionType;
        }
    }
    return null; //this should never happen but maybe create default error message?
}