import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function MultipleChoiceEditor() {
    // TODO: need to get id number for each answer choice, also maybe a pivot table?
    //then can use that to add edit/delete functionality
    const [answerChoices, answerChoiceSetter] = useState<string[]>([]);

    return (
        <div id="question-editor-multiple-choice">
            {answerChoices.map((choice) => answerChoice(choice))}

            <button className='btn float-end text-danger fs-5 m-1' onClick={(e) => {
                answerChoiceSetter([...answerChoices, ""]);
            }}>+ Add Another Answer</button>
        </div>
    );
}

function answerChoice(answerValue: string) {
    return (
        <div className="d-flex<FaTrashAlt />">
            <span className="float-start">Possible Answer:</span>
            <input className="form-control" defaultValue={answerValue} />
            <FaTrashAlt className='fs-4' />
        </div>
    );
}