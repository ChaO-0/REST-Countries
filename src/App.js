import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Searcher from "./components/Search";
import Cards from "./components/Cards";
import Country from "./components/Country";

function App() {
  const [Search, setSearch] = useState("");
  const [Val, setVal] = useState("");
  const [DarkMode, setDarkMode] = useState(getInitialMode());

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setVal(e);
  };

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(DarkMode));
    DarkMode
      ? (document.body.style.backgroundColor = "hsl(207, 26%, 17%)")
      : (document.body.style.backgroundColor = "hsl(0, 0%, 98%)");
  }, [DarkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPreferColorScheme();

    if (isReturningUser) return savedMode;
    else if (userPrefersDark) return true;
    return false;
  }

  function getPreferColorScheme() {
    if (!window.matchMedia) return;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <>
      <Nav darkmode={DarkMode} handleDarkMode={handleDarkMode} />
      <div className="container">
        <Router>
          <Switch>
            <Route
              path="/preview/:country"
              exact
              render={(props) => <Country {...props} darkmode={DarkMode} />}
            />
            <Route path="/" exact>
              <Searcher
                handleChange={handleChange}
                handleSelect={handleSelect}
                darkmode={DarkMode}
              />
              <Cards search={Search} region={Val} darkmode={DarkMode} />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
