import React, { useState } from "react";
import "./Edit.css";

const Edit = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggle} className="edit">
        Edit
      </button>
      <div className={isOpen ? "edit__active" : "edit__background"}>
        <div className="edit__modal">
          <div className="edit__close">
            <span onClick={toggle}>X</span>
          </div>
          <h2 className="edit__modalTitle">Edit Task</h2>
          <form action="" className="edit__form">
            <div className="edit__container">
              <label for="title" className="edit__label">
                Title
              </label>
              <input id="title" type="text" className="edit__title edit__input" />
            </div>
            <div className="edit__container">
              <label for="description" className="edit__label">
                Description
              </label>
              <textarea
                id="description"
                className="edit__description edit__input"
                name="description"
                cols="20"
                rows="5"
              ></textarea>
            </div>
            <div className="edit__container">
              <label for="priority" className="edit__label">
                Priority
              </label>
              <input
                className="edit__priority edit__input"
                type="range"
                id="priority"
                min="0"
                max="3"
              ></input>
            </div>
            <div className="edit__container">
              <label for="deadline" className="edit__label">
                Deadline
              </label>
              <input
                id="deadline"
                className="edit__deadline edit__input"
                type="date"
                value="now"
              />
            </div>

            <input className="edit__btn" type="submit" value="Edit Task" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
