import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import { UserContext } from "./userContext";

export const TasksContext = createContext();

export const TasksProvider = (props) => {
  const { userName, userID, token } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (userNameValue && userIDValue && tokenValue) {
      fetch(`http://localhost:5000/api/items/${userIDValue}`, {
        method: "GET",
        headers: {
          "x-auth-token": `${tokenValue}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.log(err));
    } else return;
  });

  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </TasksContext.Provider>
  );
};
