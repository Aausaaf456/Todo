import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const apiURL = `${process.env.REACT_APP_API_URL}/todos`;


    useEffect(() => {
        axios.get(apiURL)
            .then(res => setTodos(res.data))
            .catch(err => console.log(err));
    }, []);


    const handleAdd = () => {
        if (!task.trim()) return;

        axios.post(apiURL, { task })
            .then(res => {
                setTodos([...todos, res.data]);
                setTask('');
            })
            .catch(err => console.log(err));
    };


    const handleDelete = (id) => {
        axios.delete(`${apiURL}/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };


    const handleUpdate = (id) => {
        axios.put(`${apiURL}/${id}`, { task: editText })
            .then(res => {
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, task: editText } : todo
                ));
                setEditingId(null);
                setEditText('');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">To-Do App (MERN)</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a task"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAdd}>
                    Add
                </button>
            </div>

            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editingId === todo._id ? (
                            <>
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={editText}
                                    onChange={e => setEditText(e.target.value)}
                                />
                                <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(todo._id)}>Save</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {todo.task}
                                <div>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => { setEditingId(todo._id); setEditText(todo.task); }}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;





