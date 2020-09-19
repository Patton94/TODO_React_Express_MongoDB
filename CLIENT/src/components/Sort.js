import React, { useState, useEffect, useContext } from "react";
import "./Sort.css";
import { TasksContext } from "../context/tasksContext";
import { useTranslation } from "react-i18next";
import { FaSort } from "react-icons/fa";

const Sort = () => {
  const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy"));
  const [tasks, setTasks] = useContext(TasksContext);
  const [t, i18n] = useTranslation();

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
  }, [sortBy]);

  return (
    <div className="sort">
      <label htmlFor="sort">{<FaSort />}</label>
      <select
        className="sort__select"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          localStorage.setItem("sortBy", e.target.value);
        }}
        id="sort"
      >
        <optgroup label={t("Sort.BeginDate")}>
          <option value="beginDateNewest">{t("Sort.Newest")}</option>
          <option value="beginDateOldest">{t("Sort.Oldest")}</option>
        </optgroup>
        <optgroup label={t("Sort.Deadline")}>
          {" "}
          <option value="deadlineNearest">{t("Sort.Nearest")}</option>
          <option value="deadlineLatest">{t("Sort.Latest")}</option>
        </optgroup>
        <optgroup label={t("Sort.Priority")}>
          <option value="priorityMost">{t("Sort.Most")}</option>
          <option value="priorityLeast">{t("Sort.Least")}</option>
        </optgroup>
      </select>
    </div>
  );
};

export default Sort;
