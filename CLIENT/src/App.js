import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { TasksProvider } from "./context/tasksContext";

function App() {
  return (
    <TasksProvider>
      <div className="App">
        <Navbar />

        <Main />

        <Footer />
      </div>
    </TasksProvider>
  );
}

export default App;
