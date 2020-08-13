import React, { useState, useContext } from "react";
import "./Add.css";
import axios from "axios";
import { TasksContext } from "../context/tasksContext";

const Add = () => {
  const [tasks, setTasks] = useContext(TasksContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [deadline, setDeadline] = useState("");
  const [titleError, setTitleError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  // Open and close modal
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Add new task width validation
  const addTask = () => {
    const newTask = {
      title: title,
      description: description,
      priority: priority,
      deadline: deadline,
    };

    if (!title) {
      setTitleError("This field cannot be empty!");
    }
    if (!deadline) return setDeadlineError("Select a deadline date!");

    if (!titleError && !deadlineError) {
      fetch("http://localhost:5000/api/items/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      setTitle("");
      setDescription("");
      setPriority(1);
      setDeadline("");
      toggle();
    }
  };

  const getData = () => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask();
    setTimeout(getData, 200);
  };

  return (
    <>
      <button onClick={toggle} className="add">
        Add Task
      </button>
      <div className={isOpen ? "add__active" : "add__background"}>
        <div className="add__modal">
          <div onClick={toggle} className="add__close">
            <span>X</span>
          </div>
          <h2 className="add__modalTitle">Add Task</h2>
          <form action="" className="add__form">
            <div className="add__container">
              <label htmlFor="title" className="add__label">
                Title
              </label>
              <input
                value={title}
                onFocus={() => setTitleError("")}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                type="text"
                className="add__title add__input"
              />
            </div>
            {titleError ? titleError : ""}
            <div className="add__container">
              <label htmlFor="description" className="add__label">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="add__description add__input"
                name="description"
                cols="20"
                rows="5"
              ></textarea>
            </div>
            <div className="add__container">
              <label htmlFor="priority" className="add__label">
                Priority
              </label>
              <input
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="add__priority add__input"
                type="range"
                id="priority"
                min="1"
                max="3"
              ></input>
            </div>
            <div className="add__container">
              <label htmlFor="deadline" className="add__label">
                Deadline
              </label>
              <input
                value={deadline}
                onFocus={() => setDeadlineError("")}
                onChange={(e) => setDeadline(e.target.value)}
                id="deadline"
                className="add__deadline add__input"
                type="date"
                value="now"
              />
            </div>
            {deadlineError ? deadlineError : ""}

            <input
              onClick={handleAddTask}
              className="add__btn"
              type="submit"
              value="Add Task"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
