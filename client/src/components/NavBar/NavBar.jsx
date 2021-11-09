import React from "react";
import { Link } from "react-router-dom";

import ReloadCountries from "../ReloadCountries/ReloadCountries";
import SearchBar from "../SearchBar/SearchBar";

import style from "./NavBar.module.css";

export default function CardCountries() {
  return (
    <div className={style.Nav}>
      <ReloadCountries />
      <Link to="/activity">
        <button className={style.button}>Add Tourist Activity</button>
      </Link>
      <Link to="/">
        <h2 className={style.h2app}>PI COUNTRIES APP</h2>
        <h3 className={style.button}>HOME</h3>
      </Link>
      <SearchBar />
    </div>
  );
}