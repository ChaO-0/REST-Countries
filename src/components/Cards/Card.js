import React from "react";
import "./style.css";

const Card = (props) => {
  return (
    <div className="column">
      <div className={props.darkmode ? "card dark-mode" : "card"}>
        <div
          className="card-img"
          style={{ backgroundImage: `url(${props.flag})` }}
        />
        <div className="card-body">
          <h4>
            <b>{props.name}</b>
          </h4>
          <div className="info">
            <p>
              Population:{" "}
              <span className="get">{props.population.toLocaleString()}</span>
            </p>
            <p>
              Region: <span className="get">{props.region}</span>
            </p>
            <p>
              Capital: <span className="get">{props.capital}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
