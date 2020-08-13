import React, { useContext, useEffect } from "react";
import "./Delete.css";
import { TasksContext } from "../context/tasksContext";
import axios from "axios";

const Delete = (props) => {
  const [tasks, setTasks] = useContext(TasksContext);

  const deleteTask = () => {
    fetch(`http://localhost:5000/api/items/delete/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const getData = () => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTask = () => {
    deleteTask();
    setTimeout(getData, 200);
  };

  return (
    <button onClick={handleDeleteTask} className="delete">
      Delete
    </button>
  );
};

export default Delete;
