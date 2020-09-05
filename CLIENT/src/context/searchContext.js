import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  return (
    <SearchContext.Provider value={[filteredTasks, setFilteredTasks]}>
      {props.children}
    </SearchContext.Provider>
  );
};
