import React, { useContext } from "react";
import "./Done.css";
import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";

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

  const doneDemoTask = () => {
    const currentDate = new Date();
    let date1 = new Date(currentDate);
    const finishDate = date1.toISOString().slice(0, 10);

    const dTasks = [...tasks];
    const index = dTasks.findIndex((task) => task._id == props.id);

    dTasks[index].done = true;
    dTasks[index].finishDate = finishDate;

    setTasks(dTasks);
  };

  const handleDoneTask = () => {
    {
      userIDValue ? doneTask() : doneDemoTask();
    }
  };

  return (
    <button onClick={handleDoneTask} className="done">
      Done
    </button>
  );
};

export default Done;
