import React from "react";
import "./style.css";

const Nav = ({ darkmode, handleDarkMode }) => {
  return (
    <nav className={darkmode ? "dark-mode" : null}>
      <div className="navbar-brand">Where in the world?</div>
      <button className="theme-toggler" onClick={handleDarkMode}>
        <i className="far fa-moon"></i> Dark Mode
      </button>
    </nav>
  );
};

export default Nav;
