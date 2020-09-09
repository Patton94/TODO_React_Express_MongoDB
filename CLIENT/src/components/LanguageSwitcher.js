import React, { useContext } from "react";
import "./LanguageSwitcher.css";
import { LanguageContext } from "../context/languageContext";
import { useTranslation } from "react-i18next";
import Flag from "react-flagkit";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useContext(LanguageContext);
  const [t, i18n] = useTranslation();

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <div>
      <Flag country="PL" onClick={() => handleClick("pl")} />
      <Flag country="GB" onClick={() => handleClick("en")} />
    </div>
  );
};

export default LanguageSwitcher;
