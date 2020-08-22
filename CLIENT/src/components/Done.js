import React, { useContext } from "react";
import "./Done.css";
import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";

import axios from "axios";

const Done = (props) => {
  const { userName, userID, token } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;

  const [tasks, setTasks] = useContext(TasksContext);

  const doneTask = () => {
    fetch(`http://localhost:5000/api/items/${userIDValue}/edit/done/${props.title}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${tokenValue}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleDoneTask = () => {
    doneTask();
  };

  return (
    <button onClick={handleDoneTask} className="done">
      Done
    </button>
  );
};

export default Done;
