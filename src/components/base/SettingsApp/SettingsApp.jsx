import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./SettingsApp.css";
import englishLogo from "../../../assets/logoUk.png";
import spainLogo from "../../../assets/logoSpain.png";

export const SettingsApp = () => {
  const { i18n } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div
        onClick={() => {
          setShowSettings(!showSettings);
        }}
        className="btn-flotante"
      >
        <i className={`fa-solid fa-gears ${showSettings ? "rotate-icon" : ""}`}></i>
      </div>
      <div className={`settings-contain ${showSettings ? "show" : ""}`}>
        <div className="spanish" onClick={() => changeLanguage('es')}>
          <img src={spainLogo} alt="Spanish" />
        </div>
        <div className="english" onClick={() => changeLanguage('en')}>
          <img src={englishLogo} alt="English" />
        </div>
      </div>
    </>
  );
};
