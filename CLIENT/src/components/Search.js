import React, { useContext, useState, useEffect } from "react";
import "./Search.css";
import { SearchContext } from "../context/searchContext";
import { TasksContext } from "../context/tasksContext";
import { useTranslation } from "react-i18next";
import { DarkThemeContext } from "../context/darkThemeContext";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useContext(SearchContext);
  const [tasks, setTasks] = useContext(TasksContext);
  const [t, i18n] = useTranslation();
  const [darkTheme, setDarkTheme] = useContext(DarkThemeContext);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    searchTask();
  }, [searchText, tasks]);

  const searchTask = () => {
    let copyTasks = [...filteredTasks];
    let copyTasksCopy = [...tasks];
    copyTasks = copyTasksCopy.filter((task) =>
      task.title.toUpperCase().includes(searchText)
    );

    setFilteredTasks(copyTasks);
  };

  return (
    <div className="search">
      <input
        className={darkTheme ? "search__input dark" : "search__input"}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value.toUpperCase());
          if (searchText != e.target.value) {
            searchTask();
          }
        }}
        placeholder={t("Search.Placeholder")}
        type="text"
      />
    </div>
  );
};

export default Search;
