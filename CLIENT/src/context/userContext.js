import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <UserContext.Provider
      value={{
        userName: [userName, setUserName],
        token: [token, setToken],
        userID: [userID, setUserID],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
