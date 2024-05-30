/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./SettingsApp.css";
import englishLogo from "../../../assets/logoUk.png";
import spainLogo from "../../../assets/logoSpain.png";

export const SettingsApp = ({ setColorsPalette }) => {
  const { i18n } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [selectMode, setselectMode] = useState("light")
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  const changeColors = (mode) => {
    setselectMode(mode)
    if(mode === "light") {
      setColorsPalette({
        backgroundColor: "#c2a878",
        color: "#6e633d",
        helperColor: "#f1f5f2",
        colorMode: true
      })
      return;
    }
    if(mode === "dark") {
      setColorsPalette({
        backgroundColor: "#462749",
        color: "#8332AC",
        helperColor: "#F2D1C9",
        colorMode: false
      })
      return;
    }
  }

  return (
    <>
      <div
        onClick={() => {
          setShowSettings(!showSettings);
        }}
        className="btn-flotante"
      >
        <i
          className={`fa-solid fa-gears ${showSettings ? "rotate-icon" : ""}`}
        ></i>
      </div>
      <div className={`settings-contain ${showSettings ? "show" : ""}`}>
        <div
          className={`spanish ${selectedLanguage === "es" ? "selected" : ""}`}
          onClick={() => changeLanguage("es")}
        >
          <img src={spainLogo} alt="Spanish" />
        </div>
        <div
          className={`english ${selectedLanguage === "en" ? "selected" : ""}`}
          onClick={() => changeLanguage("en")}
        >
          <img src={englishLogo} alt="English" />
        </div>
      </div>


      <div className={`dark-mode-contain ${showSettings ? "show-dMode" : ""}`}>
        {selectMode === "light" && <div onClick={() => {changeColors("dark");}} className="light">
          <i className="fa-solid fa-sun"></i>
        </div>}
        
        {selectMode === "dark" && <div onClick={() => {changeColors("light");}} className="dark">
          <i className="fa-solid fa-moon"></i>
        </div>}
        
      </div>
    </>
  );
};
