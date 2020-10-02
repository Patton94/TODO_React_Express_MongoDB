import React, { createContext, useState, useEffect } from "react";

export const DarkThemeContext = createContext();

export const DarkThemeProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkTheme") !== darkTheme) {
      setDarkTheme(localStorage.getItem("darkTheme"));
    } else setDarkTheme(localStorage.getItem("darkTheme"));
  }, [darkTheme]);

  return (
    <DarkThemeContext.Provider value={[darkTheme, setDarkTheme]}>
      {props.children}
    </DarkThemeContext.Provider>
  );
};
