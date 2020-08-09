import React, { useContext } from "react";
import "./Main.css";
import DescriptionBar from "./DescriptionBar";
import Task from "./Task";
import Add from "./Add";
import Search from "./Search";
import { TasksContext } from "../context/tasksContext";

const Main = () => {
  const [tasks, setTasks] = useContext(TasksContext);

  return (
    <div className="main">
      <Search />

      <Add />

      <DescriptionBar />

      {tasks.map((task) => (
        <Task
          id={task._id}
          key={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          beginDate={task.beginDate.slice(0, 10)}
          deadline={task.deadline.slice(0, 10)}
        />
      ))}
    </div>
  );
};

export default Main;
