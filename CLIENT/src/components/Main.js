import React from "react";
import "./Main.css";
import DescriptionBar from "./DescriptionBar";
import Task from "./Task";
import Add from "./Add";
import Search from "./Search";

const Main = () => {
  return (
    <div className="main">
      <Search />

      <Add />

      <DescriptionBar />

      <Task />
    </div>
  );
};

export default Main;
