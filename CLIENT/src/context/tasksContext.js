import { createContext, useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export const TasksContext = createContext();

export const TasksProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/items").then((res) => {
      setTasks(res.data);
    });
  }, [tasks]);
  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </TasksContext.Provider>
  );
};
