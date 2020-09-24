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
    <div className="language">
      <div className="language__flag">
        <Flag country="PL" size={35} onClick={() => handleClick("pl")} />
      </div>
      <div className="language__flag">
        <Flag country="GB" size={35} onClick={() => handleClick("en")} />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
