import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Country = ({ darkmode }) => {
  const { country } = useParams();
  const [Detail, setDetail] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.eu/rest/v2/name/${country}`
        );

        const {
          flag,
          name,
          nativeName,
          population,
          region,
          subregion,
          capital,
          topLevelDomain,
          currencies,
          languages,
          borders,
        } = response.data[0];

        const fetchBorders = borders.length
          ? await axios.get(
              `https://restcountries.eu/rest/v2/alpha?codes=${borders.join(
                ";"
              )}`
            )
          : null;

        const borderList = fetchBorders?.data.map((elm) => elm.name);

        setDetail({
          flag,
          name,
          nativeName,
          population: population.toLocaleString(),
          region,
          subregion,
          capital,
          topLevelDomain,
          currencies: currencies.map((elm) => elm.name).join(", "),
          languages: languages.map((elm) => elm.name).join(", "),
          borders: borderList,
        });
      } catch (e) {
        setDetail(null);
      }
    };
    fetchData();
  }, [country]);

  return Detail ? (
    <>
      <button
        className={darkmode ? "back dark-mode" : "back"}
        onClick={() => history.goBack()}
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <div className={darkmode ? "country-info dark-mode" : "country-info"}>
        <div className="country-flag">
          <img src={Detail.flag} alt="flag" />
        </div>
        <div className="country-detail">
          <h1>{Detail.name}</h1>
          <div className="detail-info">
            <div className="main-detail">
              <p>
                Native Name: <span>{Detail.nativeName}</span>
              </p>
              <p>
                Population: <span>{Detail.population}</span>
              </p>
              <p>
                Region: <span>{Detail.region}</span>
              </p>
              <p>
                Sub Region: <span>{Detail.subregion}</span>
              </p>
              <p>
                Capital: <span>{Detail.capital}</span>
              </p>
            </div>
            <div className="side-detail">
              <p>
                Top Level Domain: <span>{Detail.topLevelDomain}</span>
              </p>
              <p>
                Currencies: <span>{Detail.currencies}</span>
              </p>
              <p>
                Languages: <span>{Detail.languages}</span>
              </p>
            </div>
          </div>

          <div className={darkmode ? "borders dark-mode" : "borders"}>
            <div className="borders-title">Border Countries:</div>
            <div className="borders-name">
              {Detail.borders !== undefined ? (
                Detail.borders.map((elm, idx) => (
                  <button key={idx}>{elm}</button>
                ))
              ) : (
                <button>No borders</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1 style={{ textAlign: "center" }}>404 COUNTRY NOT FOUND</h1>
  );
};

export default Country;
