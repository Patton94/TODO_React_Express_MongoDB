import React, { useContext } from "react";
import "./LanguageSwitcher.css";
import { LanguageContext } from "../context/languageContext";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useContext(LanguageContext);
  const [t, i18n] = useTranslation();

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => handleClick("pl")}>PL</button>
      <button onClick={() => handleClick("en")}>ENG</button>
    </div>
  );
};

export default LanguageSwitcher;
