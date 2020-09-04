import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
import { UserContext } from "./userContext";
import { LoadingContext } from "./loadingContext";

export const TasksContext = createContext();

export const TasksProvider = (props) => {
  const { userName, userID, token } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const currentDate = new Date();
  let date1 = new Date(currentDate);
  let date2 = new Date(currentDate);
  let date3 = new Date(currentDate);
  let date4 = new Date(currentDate);
  let date5 = new Date(currentDate);
  let date6 = new Date(currentDate);
  let date7 = new Date(currentDate);
  let date8 = new Date(currentDate);

  date1.setDate(date1.getDate() + 6);
  date2.setDate(date2.getDate() + 10);
  date3.setDate(date3.getDate() + 1);
  date4.setDate(date4.getDate() - 5);
  date5.setDate(date5.getDate() - 15);
  date7.setDate(date7.getDate() - 10);
  date8.setDate(date8.getDate() - 2);

  const deadline1Demo = date1.toISOString().slice(0, 10);
  const deadline2Demo = date2.toISOString().slice(0, 10);
  const deadline3Demo = date3.toISOString().slice(0, 10);
  const finishDateDemo = date4.toISOString().slice(0, 10);
  const beginDateDoneDemo = date5.toISOString().slice(0, 10);
  const beginDateDemo = date6.toISOString().slice(0, 10);
  const beginDateExcedeedDemo = date7.toISOString().slice(0, 10);
  const deadlineExcedeedDemo = date8.toISOString().slice(0, 10);

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
      _id: Math.floor(Math.random() * 999999),
      done: true,
      finishDate: finishDateDemo,
      title: "Play guitar",
      description: "Love song for my girlfriend",
      priority: 2,
      deadline: null,
      beginDate: beginDateDoneDemo,
    },
    {
      _id: Math.floor(Math.random() * 999999),
      done: false,
      finishDate: null,
      title: "Pay rent",
      description: "100$",
      priority: 3,
      deadline: deadlineExcedeedDemo,
      beginDate: beginDateExcedeedDemo,
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
        .then((data) => {
          if (
            localStorage.getItem("sortBy") == "beginDateNewest" ||
            !localStorage.getItem("sortBy")
          ) {
            const sortedTasks = [...data];
            sortedTasks.sort((a, b) => {
              return new Date(b.beginDate) - new Date(a.beginDate);
            });
            setTasks(sortedTasks);
          }
          if (localStorage.getItem("sortBy") == "beginDateOldest") {
            const sortedTasks = [...data];
            sortedTasks.sort((a, b) => {
              return new Date(a.beginDate) - new Date(b.beginDate);
            });
            setTasks(sortedTasks);
          }
          if (localStorage.getItem("sortBy") == "deadlineNearest") {
            const sortedTasks = [...data];
            sortedTasks.sort((a, b) => {
              return new Date(a.deadline) - new Date(b.deadline);
            });
            setTasks(sortedTasks);
          }
          if (localStorage.getItem("sortBy") == "deadlineLatest") {
            const sortedTasks = [...data];
            sortedTasks.sort((a, b) => {
              return new Date(b.deadline) - new Date(a.deadline);
            });
            setTasks(sortedTasks);
          }
          if (localStorage.getItem("sortBy") == "priorityMost") {
            const sortedTasks = [...data];
            sortedTasks.sort((a, b) => {
              return b.priority - a.priority;
            });
            setTasks(sortedTasks);
          }
          if (localStorage.getItem("sortBy") == "priorityLeast") {
            const sortedTasks = [...data];
            sortedTasks.sort((a, b) => {
              return a.priority - b.priority;
            });
            setTasks(sortedTasks);
          }
        })
        .catch((err) => console.log(err));
    } else {
      if (
        localStorage.getItem("sortBy") == "beginDateNewest" ||
        !localStorage.getItem("sortBy")
      ) {
        const sortedTasks = [...initialTasks];
        sortedTasks.sort((a, b) => {
          return new Date(b.beginDate) - new Date(a.beginDate);
        });
        setTasks(sortedTasks);
      }
      if (localStorage.getItem("sortBy") == "beginDateOldest") {
        const sortedTasks = [...initialTasks];
        sortedTasks.sort((a, b) => {
          return new Date(a.beginDate) - new Date(b.beginDate);
        });
        setTasks(sortedTasks);
      }
      if (localStorage.getItem("sortBy") == "deadlineNearest") {
        const sortedTasks = [...initialTasks];
        sortedTasks.sort((a, b) => {
          return new Date(a.deadline) - new Date(b.deadline);
        });
        setTasks(sortedTasks);
      }
      if (localStorage.getItem("sortBy") == "deadlineLatest") {
        const sortedTasks = [...initialTasks];
        sortedTasks.sort((a, b) => {
          return new Date(b.deadline) - new Date(a.deadline);
        });
        setTasks(sortedTasks);
      }
      if (localStorage.getItem("sortBy") == "priorityMost") {
        const sortedTasks = [...initialTasks];
        sortedTasks.sort((a, b) => {
          return b.priority - a.priority;
        });
        setTasks(sortedTasks);
      }
      if (localStorage.getItem("sortBy") == "priorityLeast") {
        const sortedTasks = [...initialTasks];
        sortedTasks.sort((a, b) => {
          return a.priority - b.priority;
        });
        setTasks(sortedTasks);
      }
    }
  }, [userIDValue, userNameValue, tokenValue]);

  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </TasksContext.Provider>
  );
};
