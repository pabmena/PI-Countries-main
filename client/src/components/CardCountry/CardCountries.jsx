import React from "react";
import style from "./CardCountries.module.css";

export default function CardCountries({ image, name, region }) {
  return (
    <div className={style.card}>
      <h2 className={style.name}>{name.toUpperCase()}</h2>
      <img
        src={image}
        alt="img countrie not found"
        width="250em"
        height="125em"
      />
      <h2 className={style.region}>{region}</h2>
  </div>
  );
}