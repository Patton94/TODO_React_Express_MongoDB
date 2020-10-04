import React, { useState, useContext } from "react";
import "./Edit.css";
import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";
import { LoadingContext } from "../context/loadingContext";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { DarkThemeContext } from "../context/darkThemeContext";

const Edit = (props) => {
  const { userID, token } = useContext(UserContext);
  const [userIDValue] = userID;
  const [tokenValue] = token;
  const [t] = useTranslation();
  const [darkTheme] = useContext(DarkThemeContext);

  const [, setIsLoading] = useContext(LoadingContext);

  const [tasks, setTasks] = useContext(TasksContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [priority, setPriority] = useState(props.priority);
  const [deadline, setDeadline] = useState(props.deadline);
  const [titleError, setTitleError] = useState("");

  const getData = () => {
    fetch(`https://todomg.herokuapp.com/api/items/${userIDValue}`, {
      method: "GET",
      headers: {
        "x-auth-token": `${tokenValue}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const editTask = () => {
    const editedTask = {
      title: title,
      description: description,
      priority: priority,
      deadline: deadline,
    };

    if (!title) {
      setTitleError(t("Edit.EmptyError"));
    } else {
      fetch(`https://todomg.herokuapp.com/api/items/${userIDValue}/edit/${props.title}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${tokenValue}`,
        },
        body: JSON.stringify(editedTask),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      setTitle(title);
      setIsLoading(true);
      setDescription(description);
      setPriority(priority);
      setDeadline(deadline);
      setTimeout(() => {
        toggle();
        getData();
      }, 100);
    }
  };

  const editDemoTask = () => {
    if (!title) {
      setTitleError(t("Edit.EmptyError"));
    } else {
      const dTasks = [...tasks];
      const index = dTasks.findIndex((task) => task._id === props.id);

      dTasks[index].title = title;
      dTasks[index].description = description;
      dTasks[index].priority = priority;
      dTasks[index].deadline = deadline;
      setTasks(dTasks);

      setTitle(title);
      setDescription(description);
      setPriority(priority);
      setDeadline(deadline);

      toggle();
    }
  };

  const handleEditTask = (e) => {
    e.preventDefault();

    userIDValue ? editTask() : editDemoTask();
  };

  return (
    <>
      <button onClick={toggle} className={darkTheme ? "edit dark" : "edit"}>
        <FaEdit />
      </button>
      <div className={isOpen ? "edit__active" : "edit__background"}>
        <div className={darkTheme ? "edit__modal dark" : "edit__modal"}>
          <div
            className={darkTheme ? "edit__close dark" : "edit__close"}
            onClick={toggle}
          >
            <GrFormClose className="edit__closeIcon" />
          </div>
          <h2 className={darkTheme ? "edit__modalTitle dark" : "edit__modalTitle"}>
            {t("Edit.ModalTitle")}
          </h2>
          <form action="" className="edit__form">
            <div className="edit__container">
              <label className="edit__label">{t("Edit.ModalTaskTitle")}</label>
              <input
                value={title}
                onFocus={() => setTitleError("")}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className={darkTheme ? "edit__input dark" : "edit__input"}
              />
            </div>
            {titleError ? <span className="edit__inputError">{titleError}</span> : ""}
            <div className="edit__container">
              <label className="edit__label">{t("Edit.ModalDescription")}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={
                  darkTheme
                    ? "edit__input edit__description dark"
                    : "edit__input edit__description"
                }
                name="description"
                cols="20"
                rows="5"
              ></textarea>
            </div>
            <div className="edit__container">
              <label className="edit__label">{t("Edit.ModalPriority")}</label>
              <input
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={
                  darkTheme
                    ? "edit__input edit__priority dark"
                    : "edit__input edit__priority"
                }
                type="range"
                min="1"
                max="3"
              ></input>
            </div>
            <div className="edit__container">
              <label className="edit__label">{t("Edit.ModalDeadline")}</label>
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={
                  darkTheme
                    ? "edit__input edit__deadline dark"
                    : "edit__input edit__deadline"
                }
                type="date"
              />
            </div>

            <input
              onClick={handleEditTask}
              className={darkTheme ? "edit__btn dark" : "edit__btn"}
              type="submit"
              value={t("Edit.ModalButton")}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
