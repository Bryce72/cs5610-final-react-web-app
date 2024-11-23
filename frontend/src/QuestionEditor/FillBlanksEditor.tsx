import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function FillBlanksEditor() {
    const [blankOptions, blankOptionsSetter] = useState<string[]>([]);

    return (
        <div id="question-editor-fill-blanks" className='mt-3 ps-5 pb-5'>
            {
                blankOptions.map((blankOp) => <div className='d-flex mb-5'>{blankOption(blankOp)}</div>)
            }

            <button
                className='btn float-end text-danger fs-5 border-light-subtle'
                onClick={(e) => {
                    blankOptionsSetter([...blankOptions, ""]);
                }}
            >
                + Add Another Answer
            </button>
        </div>
    );
}

function blankOption(optionValue: string) {
    return (
        <div className='d-flex align-items-center'>
            <span className="">Possible Answer</span>
            <input className="form-control" defaultValue={optionValue} />

            <FaRegTrashAlt className='fs-2 mx-2' />
        </div>
    );
}