import React, { useContext } from "react";
import "./Main.css";
import DescriptionBar from "./DescriptionBar";
import Task from "./Task";
import Add from "./Add";
import Search from "./Search";
import { TasksContext } from "../context/tasksContext";

const Main = () => {
  const [tasks, setTasks] = useContext(TasksContext);

  const falseTasks = tasks.filter((task) => task.done == false);
  const doneTasks = tasks.filter((task) => task.done == true);

  return (
    <div className="main">
      <Search />

      <Add />

      <DescriptionBar />

      {falseTasks.map((task) => (
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

      {doneTasks.map((task) => (
        <Task
          id={task._id}
          key={task._id}
          title={task.title}
          done={task.done}
          description={task.description}
          beginDate={task.beginDate.slice(0, 10)}
          finishDate={task.finishDate.slice(0, 10)}
        />
      ))}
    </div>
  );
};

export default Main;
