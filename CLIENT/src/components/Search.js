import React, { useContext, useState, useEffect } from "react";
import "./Search.css";
import { SearchContext } from "../context/searchContext";
import { TasksContext } from "../context/tasksContext";
import { useTranslation } from "react-i18next";
import { DarkThemeContext } from "../context/darkThemeContext";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useContext(SearchContext);
  const [tasks] = useContext(TasksContext);
  const [t] = useTranslation();
  const [darkTheme] = useContext(DarkThemeContext);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    searchTask();
  }, [searchText, tasks]); // eslint-disable-line react-hooks/exhaustive-deps

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
          if (searchText !== e.target.value) {
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
