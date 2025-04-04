import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./style.css";

const Country = ({ darkmode }) => {
  const { country } = useParams();
  const [Detail, setDetail] = useState("");
  const [Error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("../data.json");
        const jsonData = await data.json();
        const foundCountry = jsonData.find(
          (elm) => elm.name.toLowerCase() === country.toLowerCase()
        );

        console.log({ foundCountry });

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
        } = foundCountry;

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
          borders,
        });
      } catch (e) {
        console.log({ e });
        setError(true);
      }
    };
    fetchData();
  }, [country]);

  return Error ? (
    <>
      <button
        className={darkmode ? "back dark-mode" : "back"}
        onClick={() => history.goBack()}
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h1 style={{ textAlign: "center" }}>404 COUNTRY NOT FOUND</h1>
    </>
  ) : (
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
  );
};

export default Country;
