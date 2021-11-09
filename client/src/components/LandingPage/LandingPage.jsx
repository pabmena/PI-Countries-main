import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.landing}>
      <h1 className={style.h1}>HOLA MUNDO !</h1>
      <h2 className={style.h2}> APP HENRY LABS - PI NOV/2021</h2>
      <Link to="/countries">
        <button className={style.button}>Let's Go to the World</button>
      </Link>
    </div>
  );
}