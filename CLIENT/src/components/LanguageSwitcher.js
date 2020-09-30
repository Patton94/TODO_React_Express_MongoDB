import React, { useContext } from "react";
import "./LanguageSwitcher.css";
import { LanguageContext } from "../context/languageContext";
import { useTranslation } from "react-i18next";
import Flag from "react-flagkit";
import { DarkThemeContext } from "../context/darkThemeContext";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useContext(LanguageContext);
  const [t, i18n] = useTranslation();
  const [darkTheme, setDarkTheme] = useContext(DarkThemeContext);

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <div className="language">
      <div className={darkTheme ? "language__flag dark" : "language__flag"}>
        <Flag country="PL" size={35} onClick={() => handleClick("pl")} />
      </div>
      <div className={darkTheme ? "language__flag dark" : "language__flag"}>
        <Flag country="GB" size={35} onClick={() => handleClick("en")} />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
