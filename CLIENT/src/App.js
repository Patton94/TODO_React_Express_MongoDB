import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { DarkThemeContext } from "./context/darkThemeContext";

function App() {
  const [darkTheme, setDarkTheme] = useContext(DarkThemeContext);

  return (
    <div className={darkTheme ? "app dark" : "app"}>
      <Navbar />

      <Main />

      <Footer />
    </div>
  );
}

export default App;
