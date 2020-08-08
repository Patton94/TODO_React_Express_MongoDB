import React, { useState } from "react";

import "./Add.css";

const Add = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
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
              <label for="title" className="add__label">
                Title
              </label>
              <input id="title" type="text" className="add__title add__input" />
            </div>
            <div className="add__container">
              <label for="description" className="add__label">
                Description
              </label>
              <textarea
                id="description"
                className="add__description add__input"
                name="description"
                cols="20"
                rows="5"
              ></textarea>
            </div>
            <div className="add__container">
              <label for="priority" className="add__label">
                Priority
              </label>
              <input
                className="add__priority add__input"
                type="range"
                id="priority"
                min="0"
                max="3"
              ></input>
            </div>
            <div className="add__container">
              <label for="deadline" className="add__label">
                Deadline
              </label>
              <input
                id="deadline"
                className="add__deadline add__input"
                type="date"
                value="now"
              />
            </div>

            <input className="add__btn" type="submit" value="Add Task" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
