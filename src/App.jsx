import { Toaster } from "react-hot-toast";
import "./App.css";
import MainPharma from "./components/MainPharma/MainPharma";
import { SettingsApp } from "./components/base/SettingsApp/SettingsApp";

function App() {
  return (
    <>
      <SettingsApp />
      <Toaster
        toastOptions={{
          duration: 6000,
        }}
      />
      <MainPharma />
    </>
  );
}

export default App;
