import { useState, useEffect } from "react";
import React from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/alesanchezr")
      .then((resp) => resp.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const agregarTarea = () => {
    if (inputValue) {
      const nuevaTarea = { label: inputValue, done: false };
      const nuevosTodos = [...todos, nuevaTarea];
      setInputValue("");
      setTodos(nuevosTodos);
    }
  };

  useEffect(() => {
    actualizarServidor(todos);
  }, [todos]);

  const eliminarTarea = (indice) => {
    const tareasActualizadas = todos.filter((_, i) => i !== indice);
    setTodos(tareasActualizadas);
  };

  const eliminarTodasLasTareas = () => {
    setTodos([]);
  };

  const actualizarServidor = (datos) => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container" style={{ width: 400 }}>
      <h1 style={{ color: "grey" }}>Tareas</h1>
      <ul>
        <li>
          <input
            type="text"
            style={{ outline: "none" }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                agregarTarea();
              }
            }}
            placeholder={
              todos.length === 0
                ? "No hay tareas, agrega una tarea."
                : "por hacer"
            }
          ></input>
        </li>
        {todos.map((item, index) => (
          <li
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <span>{item.label}</span>
            <i
              className="far fa-minus-square"
              style={{
                color: "grey",
              }}
              onClick={() => eliminarTarea(index)}
            ></i>
          </li>
        ))}
      </ul>
      <div style={{ fontSize: 12, color: "grey" }}>
        {todos.length ? todos.length + " tarea(s) restante(s)" : ""}
      </div>
      <button onClick={eliminarTodasLasTareas}>Limpiar todas las tareas</button>
    </div>
  );
};

export default Home;
