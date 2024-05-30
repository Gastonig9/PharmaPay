import { Toaster } from "react-hot-toast";
import "./App.css";
import MainPharma from "./components/MainPharma/MainPharma";
import { SettingsApp } from "./components/base/SettingsApp/SettingsApp";
import { useEffect, useState } from "react";

function App() {
  const [colorsPalette, setColorsPalette] = useState({
    backgroundColor: "#c2a878",
    color: "#6e633d",
    helperColor: "#f1f5f2",
    colorMode: true
  })

  useEffect(() => {
    if (colorsPalette.colorMode !== undefined) {
      document.body.style.backgroundColor = colorsPalette.colorMode ? "#f1f5f2" : "#14213D";
    }
  }, [colorsPalette]);
  return (
    <>
      <SettingsApp setColorsPalette={setColorsPalette} />
      <Toaster
        toastOptions={{
          duration: 6000,
        }}
      />
      <MainPharma colorP={colorsPalette}/>
    </>
  );
}

export default App;
