import React from "react";
import Select from "react-select";
import "./style.css";

const Search = ({ handleChange, handleSelect, darkmode }) => {
  const options = [
    { value: "africa", label: "Africa" },
    { value: "america", label: "Americas" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      boxShadow: darkmode
        ? "0 1px 10px hsl(207, 26%, 17%)"
        : "0 2px 5px lightgrey",
      padding: "5px 15px",
      width: "14vw",
      fontSize: "14px",
      fontWeight: 600,
      border: 0,
      backgroundColor: darkmode ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
    }),
    menu: (base) => ({
      ...base,
      boxShadow: darkmode
        ? "0 1px 10px hsl(207, 26%, 17%)"
        : "0 2px 5px lightgrey;",
      marginTop: 5,
      width: "14vw",
      fontWeight: 600,
      fontSize: "14px",
      backgroundColor: darkmode ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
    }),
    placeholder: (base) => ({
      ...base,
      color: darkmode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "hsl(200, 15%, 8%)",
      "&:hover": {
        color: "hsl(200, 15%, 8%)",
      },
    }),
    option: (base) => {
      console.log({ base });
      return {
        ...base,
        backgroundColor: "transparent",
        color: darkmode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
        ":active": {
          backgroundColor: "transparent",
        },
        cursor: "pointer",
        padding: "5px 25px",
      };
    },
    singleValue: (base) => ({
      ...base,
      color: darkmode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
    }),
  };

  return (
    <div className={darkmode ? "searchbar dark-mode" : "searchbar"}>
      <input
        type="text"
        name="country"
        className="search"
        placeholder="Search for a country..."
        onChange={handleChange}
      />
      <i className="fas fa-search"></i>
      <Select
        className="selector"
        classNamePrefix="selector"
        styles={customStyles}
        options={options}
        components={{
          IndicatorSeparator: () => null,
        }}
        placeholder="Filter by Region"
        onChange={handleSelect}
      />
    </div>
  );
};

export default Search;
