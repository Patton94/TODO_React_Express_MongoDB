import React, { useState, useEffect, useContext } from "react";
import "./Sort.css";
import { TasksContext } from "../context/tasksContext";

const Sort = () => {
  const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy"));
  const [tasks, setTasks] = useContext(TasksContext);

  const sortSelectChange = () => {
    if (sortBy == "beginDateNewest") {
      const sortedTasks = [...tasks];
      sortedTasks.sort((a, b) => {
        return new Date(b.beginDate) - new Date(a.beginDate);
      });
      setTasks(sortedTasks);
    }
    if (sortBy == "beginDateOldest") {
      const sortedTasks = [...tasks];
      sortedTasks.sort((a, b) => {
        return new Date(a.beginDate) - new Date(b.beginDate);
      });
      setTasks(sortedTasks);
    }
    if (sortBy == "deadlineNearest") {
      const sortedTasks = [...tasks];
      sortedTasks.sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline);
      });
      setTasks(sortedTasks);
    }
    if (sortBy == "deadlineLatest") {
      const sortedTasks = [...tasks];
      sortedTasks.sort((a, b) => {
        return new Date(b.deadline) - new Date(a.deadline);
      });
      setTasks(sortedTasks);
    }
    if (sortBy == "priorityMost") {
      const sortedTasks = [...tasks];
      sortedTasks.sort((a, b) => {
        return b.priority - a.priority;
      });
      setTasks(sortedTasks);
    }
    if (sortBy == "priorityLeast") {
      const sortedTasks = [...tasks];
      sortedTasks.sort((a, b) => {
        return a.priority - b.priority;
      });
      setTasks(sortedTasks);
    }
  };

  useEffect(() => {
    sortSelectChange();
    console.log(localStorage.getItem("sortBy"));
  }, [sortBy]);

  return (
    <div>
      <label htmlFor="sort">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          localStorage.setItem("sortBy", e.target.value);
        }}
        id="sort"
      >
        <optgroup label="Begin Date">
          <option value="beginDateNewest">From the newest</option>
          <option value="beginDateOldest">From the oldest</option>
        </optgroup>
        <optgroup label="Deadline">
          {" "}
          <option value="deadlineNearest">From the nearest</option>
          <option value="deadlineLatest">From the latest</option>
        </optgroup>
        <optgroup label="Priority">
          <option value="priorityMost">Most important</option>
          <option value="priorityLeast">Least important</option>
        </optgroup>
      </select>
    </div>
  );
};

export default Sort;
