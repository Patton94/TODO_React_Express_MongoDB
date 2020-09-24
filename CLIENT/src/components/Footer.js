import React, { useState } from "react";
import "./Footer.css";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { BiHelpCircle } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import { MdDateRange } from "react-icons/md";
import { MdAlarm } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";

const Footer = () => {
  const [t, i18n] = useTranslation();

  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const toggleInfo = () => {
    setIsOpenInfo(!isOpenInfo);
    setIsOpenSettings(false);
  };

  const toggleSettings = () => {
    setIsOpenSettings(!isOpenSettings);
    setIsOpenInfo(false);
  };
  return (
    <>
      <div className="footer">
        <div className="footer__info">
          <button onClick={toggleInfo} className="footer__infoButton">
            <BiHelpCircle className="footer__icon" />
          </button>
        </div>

        <div className="footer__settings">
          <button onClick={toggleSettings} className="footer__settingsButton">
            <IoMdSettings className="footer__icon" />
          </button>
        </div>
        <div
          className={
            isOpenInfo ? "footer__modalInfo footer__active" : "footer__modalInfo"
          }
        >
          <div onClick={toggleInfo} className="footer__close">
            <GrFormClose className="footer__closeIcon" />
          </div>
          <div className="footer__iconContainer">
            <div className="footer__ico1">
              <AiOutlineLogin />
            </div>
            <div className="footer__ico2">
              <AiOutlineUserAdd />
            </div>
            <div className="footer__ico3">
              <AiOutlineLogout />
            </div>
            <div className="footer__ico4">
              <BsPlusCircleFill />
            </div>
            <div className="footer__ico5">
              <MdDescription />
            </div>
            <div className="footer__ico6">
              <GiStarsStack />
            </div>
            <div className="footer__ico7">
              <MdDateRange />
            </div>
            <div className="footer__ico8">
              <MdAlarm />
            </div>
            <div className="footer__ico9">
              <FaEdit />
            </div>
            <div className="footer__ico10">
              <MdDelete />
            </div>
            <div className="footer__ico11">
              <MdDone />
            </div>
            <div className="footer__ico12">
              <HiDotsVertical />
            </div>
            <div className="footer__txt1">{t("Info.Login")}</div>
            <div className="footer__txt2">{t("Info.Register")}</div>
            <div className="footer__txt3">{t("Info.Logout")}</div>
            <div className="footer__txt4">{t("Info.Add")}</div>
            <div className="footer__txt5">{t("Info.Description")}</div>
            <div className="footer__txt6">{t("Info.Priority")}</div>
            <div className="footer__txt7">{t("Info.BeginDate")}</div>
            <div className="footer__txt8">{t("Info.Deadline")}</div>
            <div className="footer__txt9">{t("Info.Edit")}</div>
            <div className="footer__txt10">{t("Info.Delete")}</div>
            <div className="footer__txt11">{t("Info.Done")}</div>
            <div className="footer__txt12">{t("Info.Dots")}</div>
          </div>
        </div>
        <div
          className={
            isOpenSettings
              ? "footer__modalSettings footer__active"
              : "footer__modalSettings"
          }
        >
          <div onClick={toggleSettings} className="footer__close">
            <GrFormClose className="footer__closeIcon" />
          </div>
          <div className="footer__switcherContainer">
            <LanguageSwitcher />

            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

// {t("Footer.Copyright")} &copy; Michał Gruszczak
