import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import axios from "axios";

const Cards = (props) => {
  const [Country, setCountry] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://restcountries.eu/rest/v2/all"
        );
        setCountry(data);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  }, []);

  const Countries = () => {
    if (Country) {
      if (props.search) {
        const filtered = Country.filter((data) =>
          data.name.toLowerCase().includes(props.search.toLowerCase())
        );
        if (props.region) {
          return filtered.filter((data) => data.region === props.region.label);
        }
        return filtered;
      } else {
        if (props.region) {
          return Country.filter((data) => data.region === props.region.label);
        }
        return Country;
      }
    }
  };

  const countries = Countries();

  return (
    <div className="row">
      {countries
        ? countries.map((elm, idx) => (
            <Link
              to={`/preview/${elm.name}`}
              style={{ color: "inherit" }}
              key={idx}
            >
              <Card
                name={elm.name}
                flag={elm.flag}
                population={elm.population}
                region={elm.region}
                capital={elm.capital}
                darkmode={props.darkmode}
              />
            </Link>
          ))
        : null}
    </div>
  );
};

export default Cards;
