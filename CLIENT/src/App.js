import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { TasksProvider } from "./context/tasksContext";
import { UserProvider } from "./context/userContext";
import { LoadingProvider } from "./context/loadingContext";
import { SearchProvider } from "./context/searchContext";
import { LanguageProvider } from "./context/languageContext";
import { DarkThemeProvider } from "./context/darkThemeContext";

function App() {
  return (
    <DarkThemeProvider>
      <LanguageProvider>
        <SearchProvider>
          <LoadingProvider>
            <UserProvider>
              <TasksProvider>
                <div className="App">
                  <Navbar />

                  <Main />

                  <Footer />
                </div>
              </TasksProvider>
            </UserProvider>
          </LoadingProvider>
        </SearchProvider>
      </LanguageProvider>
    </DarkThemeProvider>
  );
}

export default App;
