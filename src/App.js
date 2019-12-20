import React from "react";
import "./App.css";

import ToDoContainer from "./components/toDoContainer/index.js";

let listArray = { tasks: [] };

//if no local storage, give default
if (localStorage.getItem("ToDo") != null) {
  listArray = JSON.parse(localStorage.getItem("ToDo"));
} else {
  listArray = {
    tasks: [
      {
        content: "Welcome to Coolest To Do App!",
        done: false
      },
      {
        content: "Click 'remove' to remove a task!",
        done: false
      },
      {
        content: "You can also add more tasks!",
        done: false
      },
      {
        content: "Completed Tasks can be removed by clicking 'Clear Completed'",
        done: true
      }
    ]
  };
  localStorage.setItem("ToDo", JSON.stringify(listArray));
}

function App() {
  return (
    <div className="App">
      <div id="container">
        <h1 id="title">COOLEST TO DO APP</h1>
        <ToDoContainer data={listArray.tasks}></ToDoContainer>
      </div>
    </div>
  );
}

export default App;
