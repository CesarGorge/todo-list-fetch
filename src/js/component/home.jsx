import { useState } from "react";
import React from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  return (
    <div className="container" style={{ width: 400 }}>
      <h1 style={{ color: "grey" }}>Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            style={{ outline: "none" }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTodos(todos.concat(inputValue));
                setInputValue("");
              }
            }}
            placeholder={todos.length === 0 ? "No tasks, add task." : "to do"}
          ></input>
        </li>
        {todos.map((item, index) => (
          <li
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{item}</span>
            <i
              className="far fa-minus-square"
              style={{
                color: "grey",
              }}
              onClick={() =>
                setTodos(
                  todos.filter((t, currentIndex) => index !== currentIndex)
                )
              }
            ></i>
          </li>
        ))}
      </ul>
      <div style={{ fontSize: 12, color: "grey" }}>
        {todos.length ? todos.length + " item left" : ""}
      </div>
    </div>
  );
};

export default Home;
