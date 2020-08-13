import React, { useContext } from "react";
import "./Done.css";
import { TasksContext } from "../context/tasksContext";
import axios from "axios";

const Done = (props) => {
  const [tasks, setTasks] = useContext(TasksContext);

  const doneTask = () => {
    fetch(`http://localhost:5000/api/items/edit/done/${props.id}`, {
      method: "PATCH",
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

  const handleDoneTask = () => {
    doneTask();
    setTimeout(getData, 200);
  };

  return (
    <button onClick={handleDoneTask} className="done">
      Done
    </button>
  );
};

export default Done;
