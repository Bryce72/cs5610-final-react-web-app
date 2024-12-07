import { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithArrays() {
    const API = `${REMOTE_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <hr />
            <h4>Retreiving an item from an Array by ID</h4>
            <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <input id="wd-todo-id" defaultValue={todo.id} className="form-control w-50"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
            <hr />

            <h3>Filtering array items</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}?completed=true`}>
                Get Completed Todos
            </a><hr />

            <h3>Creating new Items in an Array</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}/create`}>
                Create Todo
            </a><hr />

            <h3>Deleting from an Array</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id} </a>
            <input defaultValue={todo.id} className="form-control w-50" onChange={(e) => setTodo({ ...todo, id: e.target.value })} /><hr />


            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
                Update Todo</a>
            <input defaultValue={todo.id} className="form-control w-25 float-start me-2"
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
            <input defaultValue={todo.title} className="form-control w-50 float-start"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
            <br /><br />
            <hr/>

            <h3>Editing Completed & Description of Todos</h3>
            <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary float-end">
                Update Todo</a>
            <h4 style={{ textAlign: "center" }}> (ToDos)Check this box IF completed - Then hit the button on right</h4>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                Todo ID:
                <input defaultValue={todo.id} className="form-control w-25 float-start me-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
                Click here if Completed:
                <input type="checkbox" className="form-check-input" id="wd-todo-completed" style={{ width: "30px", height: "30px" }}
                    checked={todo.completed} onChange={(e) =>
                        setTodo({ ...todo, completed: e.target.checked })} />
            </div>
            <br />
                        <hr/>

            <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary float-end">
                Update Todo</a>
            <h4 style={{ textAlign: "center" }}> (ToDos) Description Edit</h4>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                Todo ID:
                <input defaultValue={todo.id} className="form-control w-25 float-start me-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })} />

                <input className="form-control w-75" id="wd-todo-description"
                    value={todo.description} onChange={(e) =>
                        setTodo({ ...todo, description: e.target.value })} />

            </div>
            <br />



            <hr />
        </div>
    );
}