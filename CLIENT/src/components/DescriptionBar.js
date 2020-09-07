import React from "react";
import "./DescriptionBar.css";
import { useTranslation } from "react-i18next";

const DescriptionBar = () => {
  const [t, i18n] = useTranslation();
  return (
    <div className="bar">
      <div className="bar__title">{t("Bar.Title")}</div>
      <div className="bar__priority">{t("Bar.Priority")}</div>
      <div className="bar__beginDate">{t("Bar.BeginDate")}</div>
      <div className="bar__deadline">{t("Bar.Deadline")}</div>
      <div className="bar__empty"></div>
    </div>
  );
};

export default DescriptionBar;
