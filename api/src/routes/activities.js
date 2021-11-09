const { Router } = require("express");
const { Op } = require("sequelize");
const { Activity, Country } = require("../db.js");

const router = Router();

router.post("/", async (req, res) => {
  try {
 const { name, difficulty, duration, season, countries } = req.body;
 const activityAdd = await Activity.create({
    
    name: name,
    difficulty: difficulty,
    duration: duration,
    season: season,
  });

  for (const i of countries) {
    const country = await Country.findOne({
      where: {
        id: i,
      },
    });

  country.addActivity(activityAdd);
}
  res.json(activityAdd);
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "Error" });
}});


router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return res.json(activities);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = router;