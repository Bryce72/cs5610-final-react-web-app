import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';

export default function MultipleChoiceEditor() {
    const [answerChoices, answerChoiceSetter] = useState<string[]>([]);

    return (
        <div id="question-editor-multiple-choice" className='mt-3 ps-5 pb-5'>
            {
                answerChoices.map(
                    (choice) => <div className='d-flex mb-5'>{answerChoice(choice)}</div>)
            }

            <button
                className='btn float-end text-danger fs-5 border-light-subtle'
                onClick={(e) => {
                    answerChoiceSetter([...answerChoices, ""]);
                }}
            >
                + Add Another Answer
            </button>
        </div >
    );
}

function answerChoice(answerValue: string) {
    return (
        <div className="d-flex align-items-center">
            <span className="">Possible Answer</span>
            <input className="form-control" defaultValue={answerValue} />

            <FaRegEdit className='fs-2 ms-5' />
            <FaRegTrashAlt className='fs-2 mx-2' />
        </div>
    );
}