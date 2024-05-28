import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./SettingsApp.css";
import englishLogo from "../../../assets/logoUk.png";
import spainLogo from "../../../assets/logoSpain.png";

export const SettingsApp = () => {
  const { i18n } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
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
        <div
          className={`spanish ${selectedLanguage === 'es' ? 'selected' : ''}`}
          onClick={() => changeLanguage('es')}
        >
          <img src={spainLogo} alt="Spanish" />
        </div>
        <div
          className={`english ${selectedLanguage === 'en' ? 'selected' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          <img src={englishLogo} alt="English" />
        </div>
      </div>
    </>
  );
};
