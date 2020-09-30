import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { TasksProvider } from "./context/tasksContext";
import { UserProvider } from "./context/userContext";
import { LoadingProvider } from "./context/loadingContext";
import { SearchProvider } from "./context/searchContext";
import { LanguageProvider } from "./context/languageContext";
import { DarkThemeProvider } from "./context/darkThemeContext";

import "./i18next";

ReactDOM.render(
  <Suspense
    fallback={
      <div
        className={
          localStorage.getItem("darkTheme")
            ? "loading__container dark"
            : "loading__container"
        }
      >
        <span
          className={
            localStorage.getItem("darkTheme")
              ? "loading__logoTitleText dark"
              : "loading__logoTitleText"
          }
        >
          TODO by <span className="loading__logoSignature">M.G.</span>
        </span>
        <div class="lds-ring">
          <div className={localStorage.getItem("darkTheme") ? "dark" : ""}></div>
          <div className={localStorage.getItem("darkTheme") ? "dark" : ""}></div>
          <div className={localStorage.getItem("darkTheme") ? "dark" : ""}></div>
          <div className={localStorage.getItem("darkTheme") ? "dark" : ""}></div>
        </div>
      </div>
    }
  >
    <DarkThemeProvider>
      <LanguageProvider>
        <SearchProvider>
          <LoadingProvider>
            <UserProvider>
              <TasksProvider>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </TasksProvider>
            </UserProvider>
          </LoadingProvider>
        </SearchProvider>
      </LanguageProvider>
    </DarkThemeProvider>
  </Suspense>,
  document.getElementById("root")
);

serviceWorker.unregister();
