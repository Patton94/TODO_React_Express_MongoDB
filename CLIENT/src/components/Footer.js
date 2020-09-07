import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t, i18n] = useTranslation();
  return (
    <div className="footer">
      <span>{t("Footer.Copyright")} &copy; Michał Gruszczak</span>
    </div>
  );
};

export default Footer;
