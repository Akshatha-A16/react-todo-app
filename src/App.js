import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // to track which todo is being edited

  const addTodo = () => {
    if (todo.trim() === "") return;

    // If editing → update the item
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = todo;
      setTodos(updatedTodos);
      setEditIndex(null);
      setTodo("");
      return;
    }

    // If adding new todo
    setTodos([...todos, todo]);
    setTodo("");
  };

  const deleteTodo = (index) => {
    const newList = todos.filter((_, i) => i !== index);
    setTodos(newList);
  };

  const editTodo = (index) => {
    setTodo(todos[index]);     // show item in input box
    setEditIndex(index);       // switch button to update mode
  };

  return (
    <div className="app">
      <h1>Todo App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((item, index) => (
          <li key={index}>
            {item}

            <div>
              <button className="edit-btn" onClick={() => editTodo(index)}>
                ✏️
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
