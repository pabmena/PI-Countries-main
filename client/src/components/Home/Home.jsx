import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivities,
  orderByName,
  orderByPopulation,
  filterCountriesByRegion,
  filterCountriesByActivity,
  } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import CardCountries from "../CardCountry/CardCountries";
import style from "./Home.module.css";


export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries); 
  const allActivities = useSelector((state) => state.activities);

  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getCountries()); // = mapdispatchtoprops
    dispatch(getActivities());
  }, [dispatch]) // [] para que no se me genere un loop infinito de llamados.
  

    //Paginado
  const [currentPage, setCurrentPage] = useState(1); // estado con pagina actual y un estado que me setee la pagina actual.
  const [countriesPerPage, setCountriesPerPage] = useState(9); // setea mis paises por página que van a hacer 9.
  const indexOfLastCountry = currentPage * countriesPerPage; //9 indice de mi ultimo pais por paises por pagina.
  const indexOfFirtsCountry = indexOfLastCountry - countriesPerPage; // indice del ultimo pais menos paises por pagina =0.
  const currentCountries = allCountries.slice(indexOfFirtsCountry, indexOfLastCountry); // arreglo del estado de paises que me trae del reducer el estado countries.
     //slice= de un arreglo toma una porcion dependiendo de lo que le pase por parametro.
  
  const pagination = (pageNumber) => { //ayuda a renderizar
    setCurrentPage(pageNumber) 
}

//Handlers
  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered-${e.target.value}`);
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered-${e.target.value}`);
  }

  function handleFilterRegion(e) {
    dispatch(filterCountriesByRegion(e.target.value));
    setCurrentPage(1);
}

  function handleFilterActivity(e) {
    dispatch(filterCountriesByActivity(e.target.value));
    setCurrentPage(1);
  
  }

  return (
    <div>
      <div>
        <NavBar />
        <Fragment >
          <div className={style.filter}>
          <label className={style.orderlabel}>
          <h3>Ordered By:</h3>
            <select onChange={(e) => handleSortName(e)}>
              <option>-Name-</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <select onChange={(e) => handleSortPopulation(e)}>
              <option>-Population-</option>
              <option value="mayor">Higher</option>
              <option value="menor">Lower</option>
            </select>
            </label>
          <label>
            {" "}
            <h3>Filtered By:</h3>
            <select onChange={(e) => handleFilterRegion(e)}>
              <option value="All">-Region-</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Antarctic">Antarctic</option>
            </select>
            <select onChange={(e) => handleFilterActivity(e)}>
              <option value="all">-Activity-</option>
              {allActivities &&
                allActivities.map((el) => {
                  return (
                    <option key={el.id} value={`${el.name}`}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
          </label>
          </div>
        </Fragment>
        <div>
          <div>
          <Pagination 
                 countriesPerPage= {countriesPerPage} allCountries={allCountries.length} pagination={pagination}
                 />
          </div>
        </div>
        <div className={style.container}>
          {currentCountries &&
            currentCountries.map((ctry) => {
              return (
                <Link to={"/details/" + ctry.id}>
                  <CardCountries
                    name={ctry.name}
                    image={ctry.image}
                    region={ctry.region}
                    population=  {ctry.population}
                    key={ctry.id}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}