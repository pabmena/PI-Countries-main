const { Router } = require("express");
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");
const axios = require("axios");

const router = Router();

const getApiCountries = async () => { 
  const countries = await Country.findAll({
    attributes: ["id", "name", "image", "region", "capital", "subregion", "area", "population"],
  });
  if (!countries.length) {
    var allCountry = await axios.get("https://restcountries.com/v3/all");
    allCountry = allCountry.data
    allCountry = allCountry.map((el) => {

      return {
            id: el.cca3,
            name: el.name.common,
            image: el.flags.find((e)=>e.includes('svg')),  
            region: el.region,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population,
      }
    });
    await Country.bulkCreate(allCountry);
    return allCountry;
  } else {
    return countries
  }};
    

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    let countryById = await Country.findByPk(id.toUpperCase(), {
      include: Activity,
    });
    countryById ? res.send(countryById) : res.sendStatus(404);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  await getApiCountries();
  const { name } = req.query;
  
  try {
    if (name) {
      const countryName = await Country.findAll({
        
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: Activity,
      });
      
      countryName.length
        ? res.status(200).json(countryName)
        : res.status(404).send("The country with that name was not found");
    
    } else {      
        const countries = await Country.findAll({
        include: [{ model: Activity, require: true }],
      });      
      res.send(countries);
    }

  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
