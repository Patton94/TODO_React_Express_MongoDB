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

  const currentDate = new Date();
  let date1 = new Date(currentDate);
  let date2 = new Date(currentDate);
  let date3 = new Date(currentDate);
  let date4 = new Date(currentDate);
  let date5 = new Date(currentDate);
  let date6 = new Date(currentDate);

  date1.setDate(date1.getDate() + 6);
  date2.setDate(date2.getDate() + 10);
  date3.setDate(date3.getDate() + 1);
  date4.setDate(date4.getDate() - 5);
  date5.setDate(date5.getDate() - 15);

  const deadline1Demo = date1.toISOString().slice(0, 10);
  const deadline2Demo = date2.toISOString().slice(0, 10);
  const deadline3Demo = date3.toISOString().slice(0, 10);
  const finishDateDemo = date4.toISOString().slice(0, 10);
  const beginDateDoneDemo = date5.toISOString().slice(0, 10);
  const beginDateDemo = date6.toISOString().slice(0, 10);

  const initialTasks = [
    {
      _id: Math.floor(Math.random() * 999999),
      done: false,
      finishDate: null,
      title: "Repair a car",
      description: "Gearbox to fix",
      priority: 2,
      deadline: deadline1Demo,
      beginDate: beginDateDemo,
    },
    {
      _id: Math.floor(Math.random() * 999999),
      done: false,
      finishDate: null,
      title: "Visit Mom",
      description: "Buy flowers",
      priority: 3,
      deadline: deadline2Demo,
      beginDate: beginDateDemo,
    },
    {
      _id: Math.floor(Math.random() * 999999),
      done: false,
      finishDate: null,
      title: "Rule the Universe!",
      description: "Don't need there any description",
      priority: 3,
      deadline: deadline3Demo,
      beginDate: beginDateDemo,
    },
    {
      id: Math.floor(Math.random() * 999999),
      done: true,
      finishDate: finishDateDemo,
      title: "Play guitar",
      description: "Love song for my girlfriend",
      priority: 2,
      deadline: null,
      beginDate: beginDateDoneDemo,
    },
  ];

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
    } else setTasks(initialTasks);
  }, [userIDValue, userNameValue, tokenValue]);

  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </TasksContext.Provider>
  );
};
