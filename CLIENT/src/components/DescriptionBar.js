import React, { useState, useEffect, useContext } from "react";
import "./DescriptionBar.css";
import { useTranslation } from "react-i18next";
import { MdDescription } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import { MdDateRange } from "react-icons/md";
import { MdAlarm } from "react-icons/md";
import { DarkThemeContext } from "../context/darkThemeContext";

const DescriptionBar = () => {
  const [t] = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const [darkTheme] = useContext(DarkThemeContext);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className={darkTheme ? "bar dark" : "bar"}>
      <div className="bar__title">{width < 900 ? <MdDescription /> : t("Bar.Title")}</div>
      <div className="bar__priority">
        {width < 900 ? <GiStarsStack /> : t("Bar.Priority")}
      </div>
      <div className="bar__beginDate">
        {width < 900 ? <MdDateRange /> : t("Bar.BeginDate")}
      </div>
      <div className="bar__deadline">{width < 900 ? <MdAlarm /> : t("Bar.Deadline")}</div>
      <div className="bar__empty"></div>
    </div>
  );
};

export default DescriptionBar;
